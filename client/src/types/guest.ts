import { z } from 'zod';
import validator from 'validator';
import { GuestStatus } from '../utils/constants';

export interface IGuest {
  _id: string;
  fullName: string;
  phone: string;
  nationality: string;
  nationalID: string;
  status: GuestStatus;
  email?: string;
}

export const formSchema = z
  .object({
    fullName: z
      .string({
        required_error: 'required field',
      })
      .min(6, 'Must be at least 06 long character')
      .trim(),
    phone: z.string().refine(validator.isMobilePhone),
    nationality: z
      .string({
        required_error: 'required field',
      })
      .trim(),
    nationalID: z
      .string({
        required_error: 'required field',
      })
      .min(6, { message: 'Must be at last 6 long character' })
      .trim(),
    status: z.nativeEnum(GuestStatus).optional().default(GuestStatus.Pending),
    email: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!!data.email) {
        return validator.isEmail;
      }
      return true;
    },
    {
      message: 'Must be a valid email',
      path: ['email'],
    },
  );

export type GuestFormData = z.infer<typeof formSchema>;

export type GetAllGuestsResType = {
  page: number;
  pages: number;
  pageSize: number;
  total: number;
  data: IGuest[];
};
