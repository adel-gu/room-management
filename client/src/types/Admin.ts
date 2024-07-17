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

export const loginFormSchema = z.object({
  email: z.string().refine(validator.isEmail),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    name: z.string().min(3, { message: 'Please enter your name' }),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export type registerData = z.infer<typeof registerFormSchema>;

export const verificationFormSchema = z.object({
  token: z.string().min(6, 'Token must be at least 6 characters long'),
});

export type verificationData = z.infer<typeof verificationFormSchema>;
