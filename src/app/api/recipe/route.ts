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

    const token = req.headers.get('authorization');

    if (!token)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 403 }
      );

    const userId = await authenticated(token);

    if (!userId)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 403 }
      );

    const recipe = new Recipe({
      owner: userId,
      ...body,
    });

    await recipe.save();

    return Response.json({ status: 'Success', recipe });
  } catch (err) {
    return Response.json(
      { error: 'Internal server error', err },
      { status: 500 }
    );
  }
}
