import { z } from 'zod';
import validator from 'validator';

export interface IGuest {
  _id: string;
  fullName: string;
  phone: string;
  nationality: string;
  nationalID: string;
  email?: string;
}

export const formSchema = z.object({
  fullName: z
    .string({
      required_error: 'required field',
    })
    .min(6, 'Must be at least 03 long character')
    .trim(),
  phone: z.string().refine(validator.isMobilePhone),
  nationality: z
    .string({
      required_error: 'required field',
    })
    .min(6, 'Must be at least 03 long character')
    .trim(),
  nationalID: z
    .string({
      required_error: 'required field',
    })
    .trim(),
  email: z.string().refine(validator.isEmail).optional(),
});

export type GuestFormData = z.infer<typeof formSchema>;

export type GetAllGuestsResType = {
  page: number;
  pages: number;
  pageSize: number;
  total: number;
  data: IGuest[];
};
