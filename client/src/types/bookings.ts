import { z } from 'zod';
import { IGuest } from './guest';
import { IRoom } from './room';
import { BookingStatus } from '../utils/constants';

export interface IBooking {
  _id: string;
  room: IRoom;
  guest: IGuest;
  startDate: Date;
  endDate: Date;
  numGuests: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  createdAt: Date;
  roomPrice?: number;
  totalPrice?: number;
  numNights?: number;
  extraPrice?: number;
  observations?: string;
}

export interface ICheckin {
  status: BookingStatus.CheckedIn;
  hasBreakfast?: boolean;
  isPaid: boolean;
  extraPrice?: number;
}

export type GetAllBookingsResType = {
  page: number;
  pages: number;
  pageSize: number;
  total: number;
  data: IBooking[];
};

export const formSchema = z
  .object({
    room: z.string().min(1, { message: 'This field is required' }),
    guest: z.string().min(1, { message: 'This field is required' }),
    startDate: z.coerce.date({ required_error: 'required field' }),
    endDate: z.coerce.date({ required_error: 'required field' }),
    numGuests: z.coerce.number().min(1, { message: 'At least one guest' }),
    status: z
      .nativeEnum(BookingStatus)
      .optional()
      .default(BookingStatus.Pending),
    hasBreakfast: z.coerce.boolean({ required_error: 'Required field' }),
    isPaid: z.coerce.boolean({ required_error: 'Required field' }),
    extraPrice: z.coerce.number().optional(),
    observations: z.string().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      if (data.hasBreakfast) {
        return data.extraPrice !== undefined;
      }

      return true;
    },
    {
      message: 'Required field',
      path: ['extraPrice'],
    },
  );

export type BookingFormData = z.infer<typeof formSchema>;
