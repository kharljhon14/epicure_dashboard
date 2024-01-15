import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required!' })
      .min(1, 'Name is required!')
      .max(32, 'Name should be less than 32 characters'),
    email: z
      .string({ required_error: 'Email is required!' })
      .min(1, 'Email is required!')
      .email('Please enter a valid email!'),
    password: z
      .string({ required_error: 'Password is required!' })
      .min(8, 'Password should atleast be 8 characters long!')
      .max(100, 'Password should be less than 100 characters!'),
    confirm_password: z
      .string({
        required_error: 'Confirm password is required!',
      })
      .min(8, 'Confirm password should atleast be 8 characters long!'),
    accept: z.literal(true, {
      errorMap: () => ({
        message: 'Please agree to all the terms and conditions!',
      }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
