import { z } from 'zod';

const MAX_FILE_SIZE = 3000000;
function checkFileType(file: File) {
  // file type checking
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (!fileType) return false;

    if (['png', 'jpg', 'JPG', 'PNG'].includes(fileType)) return true;
  }
  return false;
}

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
  image: z
    .custom<File>()
    .refine((file) => file && file.size < MAX_FILE_SIZE, 'Max size is 3MB') // file size validation
    .refine(
      (file) => checkFileType(file),
      'Only .jpg, .png formats are supported'
    )
    .optional(),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;
