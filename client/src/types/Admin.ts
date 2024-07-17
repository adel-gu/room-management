import { z } from 'zod';
import { Roles } from '../utils/constants';
import validator from 'validator';

export interface IAdmin {
  _id: string;
  active: boolean;
  name: string;
  email: string;
  password: string;
  role: Roles;
  tenantId: string;
  createdAt: Date;
  isVerified: boolean;
  salt?: string;
  image?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordToken?: string;
  passwordTokenExpires?: Date;
}

export const formSchema = z.object({
  email: z.string().refine(validator.isEmail),
  password: z.string(),
});

export type LoginData = z.infer<typeof formSchema>;
