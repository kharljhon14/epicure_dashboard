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

export const SignInUSerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .min(1, 'Email is required!')
    .email('Please enter a valid email!'),
  password: z
    .string({ required_error: 'Password is required!' })
    .min(1, 'Password is required!')
    .max(100, 'Password should be less than 100 characters!'),
});

export type SignInUserScehmaType = z.infer<typeof SignInUSerSchema>;

export const ForgotPasswordRequestSchema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .min(1, 'Email is required!')
    .email('Please enter a valid email!'),
});

export type ForgotPasswordRequestSchemaType = z.infer<
  typeof ForgotPasswordRequestSchema
>;

export const ResetPasswordRequestSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is required!' })
      .min(8, 'Password should atleast be 8 characters long!')
      .max(100, 'Password should be less than 100 characters!'),
    confirm_password: z
      .string({
        required_error: 'Confirm password is required!',
      })
      .min(8, 'Confirm password should atleast be 8 characters long!'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ['confirm_password'],
  });

export type ResetPasswordRequestSchemaType = z.infer<
  typeof ResetPasswordRequestSchema
>;
