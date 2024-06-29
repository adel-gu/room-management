import mongoose, { Model } from 'mongoose';
import { ModelsEnum } from '../utils/constants';

interface IRoom {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: string;
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
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Room = mongoose.model<IRoom, RoomModelType>(ModelsEnum.Room, schema);
export default Room;
