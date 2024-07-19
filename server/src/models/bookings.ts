import mongoose, { Types, Model } from 'mongoose';
import {
  ModelsEnum,
  RoomStatus,
  BookingStatus,
  GuestStatus,
} from '../utils/constants';
import { IRoom } from './rooms';

interface IBooking {
  room: Types.ObjectId;
  guest: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  numGuests: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  createdAt: Date;
  tenantId: Types.ObjectId;
  roomPrice?: number;
  totalPrice?: number;
  numNights?: number;
  extraPrice?: number;
  observations?: string;
  wasNew?: boolean;
}

type BookingModelType = Model<IBooking>;

const schema = new mongoose.Schema<IBooking>({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsEnum.Room,
    autopopulate: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsEnum.Guest,
    autopopulate: true,
  },
  startDate: { type: Date, required: [true, 'Start date field is required!'] },
  endDate: { type: Date, required: [true, 'End date field is required!'] },
  numGuests: {
    type: Number,
    required: [true, 'Number of guests field is required!'],
  },
  status: {
    type: String,
    enum: BookingStatus,
    default: BookingStatus.Pending,
    required: [true, 'Status field is required!'],
  },
  hasBreakfast: {
    type: Boolean,
    required: [true, 'Has breakfast field is required!'],
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    immutable: true,
  },
  isPaid: { type: Boolean, required: [true, 'Is paid field is required!'] },
  createdAt: { type: Date, default: Date.now() },
  roomPrice: Number,
  totalPrice: Number,
  numNights: Number,
  extraPrice: Number,
  observations: String,
});

schema.pre('save', async function (next) {
  if (!this.isNew) return next();

  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(
      this.endDate.getTime() - this.startDate.getTime(),
    );
    this.numNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const room = (await mongoose
    .model(ModelsEnum.Room)
    .findById(this.room)) as IRoom;
  if (room && this.numGuests > room.maxCapacity) {
    throw new Error(
      'Choose a room where number of guests is less then or equal room capacity',
    );
  }

  if (this.isNew && room.status !== RoomStatus.Available) {
    throw new Error('Choose an available room. This room is already taken');
  }

  if (this.hasBreakfast && !this.extraPrice) {
    throw new Error('Must have extra price');
  }

  this.roomPrice = room.regularPrice - (room.discount || 0);
  this.totalPrice = this.roomPrice + (this.extraPrice || 0);

  next();
});

schema.post('save', async function (doc, next) {
  try {
    if (doc.status === BookingStatus.Pending) {
      await mongoose
        .model('Room')
        .findByIdAndUpdate(this.room, { status: RoomStatus.Reserved });
      await mongoose
        .model('Guest')
        .findByIdAndUpdate(this.guest, { status: GuestStatus.Reserved });
    }

    if (doc.status === BookingStatus.CheckedIn) {
      await mongoose
        .model('Room')
        .findByIdAndUpdate(this.room, { status: RoomStatus.Occupied });
      await mongoose
        .model('Guest')
        .findByIdAndUpdate(this.guest, { status: GuestStatus.CheckedIn });
    }

    if (doc.status === BookingStatus.CheckedOut) {
      await mongoose
        .model('Room')
        .findByIdAndUpdate(this.room, { status: RoomStatus.Cleaning });
      await mongoose
        .model('Guest')
        .findByIdAndUpdate(this.guest, { status: GuestStatus.CheckedOut });
    }
  } catch (error) {
    console.error('Error in post-save hook:', error);
  }

  next();
});
schema.plugin(require('mongoose-autopopulate'));

const Booking = mongoose.model<IBooking, BookingModelType>(
  ModelsEnum.Booking,
  schema,
);

export default Booking;
