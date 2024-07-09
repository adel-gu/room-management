import mongoose, { Types, Model, Query, Document } from 'mongoose';
import { ModelsEnum } from '../utils/constants';
import { IRoom } from './rooms';

interface IBooking {
  roomId: Types.ObjectId;
  guestId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  numGuests: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  createdAt: Date;
  roomPrice?: number;
  totalPrice?: number;
  numNights?: number;
  extraPrice?: number;
  observations?: string;
}

type BookingModelType = Model<IBooking>;

const schema = new mongoose.Schema<IBooking>({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: ModelsEnum.Room },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: ModelsEnum.Guest },
  startDate: { type: Date, required: [true, 'Start date field is required!'] },
  endDate: { type: Date, required: [true, 'End date field is required!'] },
  numGuests: {
    type: Number,
    required: [true, 'Number of guests field is required!'],
  },
  status: { type: String, required: [true, 'Status field is required!'] },
  hasBreakfast: {
    type: Boolean,
    required: [true, 'Has breakfast field is required!'],
  },
  isPaid: { type: Boolean, required: [true, 'Is paid field is required!'] },
  createdAt: { type: Date, default: Date.now() },
  roomPrice: Number,
  totalPrice: Number,
  numNights: Number,
  extraPrice: Number,
  observations: String,
});

schema.pre<IBooking>('save', async function (next) {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(
      this.endDate.getTime() - this.startDate.getTime(),
    );
    this.numNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const room = (await mongoose
    .model(ModelsEnum.Room)
    .findById(this.roomId)) as IRoom;
  if (room && this.numGuests > room.maxCapacity) {
    throw new Error(
      'Choose a room where number of guests is less then or equal room capacity',
    );
  }

  if (room.status === 'Taken') {
    throw new Error('Choose an available room. This room is already taken');
  }

  if (this.hasBreakfast && !this.extraPrice) {
    throw new Error('Must have extra price');
  }

  this.roomPrice = room.regularPrice - (room.discount || 0);
  this.totalPrice = this.roomPrice + (this.extraPrice || 0);

  next();
});

// Update room status
schema.post<IBooking>('save', async function (next) {
  await mongoose
    .model(ModelsEnum.Room)
    .findByIdAndUpdate(this.roomId, { status: 'Taken' });
});

const Booking = mongoose.model<IBooking, BookingModelType>(
  ModelsEnum.Booking,
  schema,
);

export default Booking;
