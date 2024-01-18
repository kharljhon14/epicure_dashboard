import { z } from 'zod';

export const RecipeSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .min(1, 'Name is required!')
    .max(60, 'Name should be less than 60 characters'),
  instruction: z
    .string({ required_error: 'Instruction is required!' })
    .min(1, 'Instruction is required!')
    .max(1000, 'Name should be less than 1000 characters'),
  ingredients: z
    .string({ required_error: 'Ingredients is required!' })
    .array()
    .min(1, { message: 'Ingredients is required!' })
    .max(20, { message: 'Ingredients should be less than 20' }),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;
