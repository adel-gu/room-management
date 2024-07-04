import { z } from 'zod';

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5mb
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export interface IRoom {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  description?: string;
  image?: string;
  createdAt?: Date;
  [key: string]: any;
}

export const formSchema = z
  .object({
    name: z
      .string({
        required_error: 'required field',
      })
      .min(3, 'Must be at least 03 long character')
      .trim(),
    maxCapacity: z.coerce
      .number({
        required_error: 'Max Capacity is required',
        invalid_type_error: 'Must be a valid number',
      })
      .min(1, 'Must be at least 01'),
    regularPrice: z.coerce
      .number({
        required_error: 'Regular Price is required',
        invalid_type_error: 'Must be a valid number',
      })
      .min(1),
    discount: z.coerce.number().optional(),
    description: z
      .string()
      .trim()
      .max(250, 'Description must contain at most 250 character(s)')
      .optional(),
    roomImage: z.instanceof(File).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.roomImage) {
      if (data.roomImage.size > MAX_UPLOAD_SIZE) {
        ctx.addIssue({
          code: 'custom',
          message: 'Image size should not exceed 5MB.',
          path: ['roomImage'],
        });
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(data.roomImage.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid image type. Only JPEG, PNG, and GIF are allowed.',
          path: ['roomImage'],
        });
      }
    }
    if (data.discount !== undefined && data.discount >= data.regularPrice) {
      ctx.addIssue({
        code: 'custom',
        message: 'Discount must be less than the Regular Price',
        path: ['discount'],
      });
    }
  });

export type RoomFormData = z.infer<typeof formSchema>;

export type EditReqType = {
  roomId: string;
  editedData: FormData;
};

export type GetAllRoomsResType = {
  currentPage: number;
  totalPages: number;
  totalDocs: number;
  pageSize: number;
  data: IRoom[];
};
