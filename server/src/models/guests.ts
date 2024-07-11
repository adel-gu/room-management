import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import { GuestStatus, ModelsEnum } from '../utils/constants';

interface IGuest {
  fullName: string;
  phone: string;
  nationality: string;
  nationalID: string;
  createdAt: Date;
  status: GuestStatus;
  email?: string;
}

type GuestModelType = Model<IGuest>;

const schema = new mongoose.Schema<IGuest, GuestModelType>({
  fullName: {
    type: String,
    required: [true, 'Guests full name field is required'],
  },
  phone: {
    type: String,
    required: [true, 'Guest phone field is required'],
    validate: {
      validator: function (val: string) {
        return validator.isMobilePhone(val, 'any');
      },
      message: 'Please provide a valid phone number',
    },
    trim: true,
  },
  nationality: {
    type: String,
    required: [true, 'Guests nationality field is required'],
  },
  nationalID: {
    type: String,
    required: [true, 'Guests national ID field is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  status: {
    type: String,
    enum: GuestStatus,
    default: GuestStatus.Pending,
    required: [true, 'A room must have a status'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a correct email'],
  },
});

const Guest = mongoose.model<IGuest, GuestModelType>(ModelsEnum.Guest, schema);
export default Guest;
