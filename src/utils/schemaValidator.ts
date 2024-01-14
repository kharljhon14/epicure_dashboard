import type { ZodSchema } from 'zod';

export function schemaValidator(schema: ZodSchema, body: any) {
  const result = schema.safeParse(body);

  if (!result.success) {
    let errorMessage = '';
    result.error.issues.forEach((issue) => {
      errorMessage = `${errorMessage + issue.path[0]}: ${issue.message}. `;
    });

    return errorMessage;
  }

  return '';
}
