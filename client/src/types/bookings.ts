import { IGuest } from './guest';
import { IRoom } from './room';

export interface IBooking {
  _id: string;
  room: IRoom;
  guest: IGuest;
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

export type GetAllBookingsResType = {
  page: number;
  pages: number;
  pageSize: number;
  total: number;
  data: IBooking[];
};
