import { z } from 'zod';

export const RecipeSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .min(1, 'Name is required!')
    .max(60, 'Name should be less than 60 characters'),
  instruction: z
    .string({ required_error: 'Instruction is required!' })
    .min(1, 'Instruction is required!')
    .max(9999, 'Name should be less than 10000 characters'),
  ingredients: z
    .string({ required_error: 'Ingredients is required!' })
    .min(1, 'Ingredients is required!')
    .max(9999, 'Name should be less than 10000 characters'),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;
