import { isValidObjectId } from 'mongoose';
import { cookies } from 'next/headers';

import Recipe from '@/models/recipe';
import { RecipeSchema, type RecipeSchemaType } from '@/schemas/recipe';
import { authenticated } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { schemaValidator } from '@/utils/schemaValidator';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: Request, { params }: Params) {
  await connectDB();

  if (!isValidObjectId(params.id))
    return Response.json({ error: 'Invalid recipe Id!' }, { status: 422 });

  const recipe = await Recipe.findById(params.id);

  if (!recipe)
    return Response.json({ error: 'Could not find recipe!' }, { status: 404 });

  return Response.json({ recipe });
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    const body: RecipeSchemaType = await req.json();
    const error = schemaValidator(RecipeSchema, body);

    if (error) return Response.json({ error }, { status: 422 });

    if (!isValidObjectId(params.id))
      return Response.json({ error: 'Invalid recipe Id!' }, { status: 422 });

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

    const recipe = await Recipe.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    });

    if (!recipe)
      return Response.json(
        { error: 'Could not find recipe!' },
        { status: 404 }
      );

    return Response.json({ status: 'Success', recipe });
  } catch (err) {
    return Response.json({ error: 'Internal server error!' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  await connectDB();

  if (!isValidObjectId(params.id))
    return Response.json({ error: 'Invalid recipe Id!' }, { status: 422 });

  const recipe = await Recipe.findByIdAndDelete(params.id);

  if (!recipe)
    return Response.json({ error: 'Could not find recipe!' }, { status: 404 });

  return Response.json({ status: 'Success' });
}
