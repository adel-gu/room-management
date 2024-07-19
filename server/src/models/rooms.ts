import mongoose, { Model, Types } from 'mongoose';
import { ModelsEnum, RoomStatus } from '../utils/constants';

export interface IRoom {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  status: RoomStatus;
  discount?: number;
  description?: string;
  image?: string;
  tenantId: Types.ObjectId;
  createdAt: Date;
}

type RoomModelType = Model<IRoom>;

const schema = new mongoose.Schema<IRoom, RoomModelType>({
  name: { type: String, required: [true, 'Room name field is required'] },
  maxCapacity: {
    type: Number,
    required: [true, 'Room max capacity field is required'],
  },
  regularPrice: {
    type: Number,
    required: [true, 'Room regular price field is required'],
  },
  discount: {
    type: Number,
    validate: {
      validator: function (this: IRoom, val: number) {
        return val <= this.regularPrice;
      },
      message: 'Discount should be less than the regular price',
    },
  },
  status: {
    type: String,
    enum: RoomStatus,
    default: RoomStatus.Available,
    required: [true, 'A room must have a status'],
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    immutable: true,
  },
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const Room = mongoose.model<IRoom, RoomModelType>(ModelsEnum.Room, schema);
export default Room;
