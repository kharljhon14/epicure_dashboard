import { cookies } from 'next/headers';

import Recipe from '@/models/recipe';
import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';
import { authenticated } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { schemaValidator } from '@/utils/schemaValidator';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: RecipeSchemaType = await req.json();
    const error = schemaValidator(RecipeSchema, body);

    if (error) return Response.json({ error }, { status: 422 });

    const cookieStore = cookies();

    const token = cookieStore.get('session');

    if (!token?.value)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 401 }
      );

    const userId = await authenticated(token.value);

    if (!userId)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 401 }
      );

    const recipe = new Recipe({
      owner: userId,
      ...body,
    });

    // await recipe.save();

    return Response.json({ status: 'Success', recipe });
  } catch (err) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
