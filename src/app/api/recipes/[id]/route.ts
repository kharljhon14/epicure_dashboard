import { isValidObjectId } from 'mongoose';

import Recipe from '@/models/recipe';
import connectDB from '@/utils/connectDB';

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

export async function DELETE(_req: Request, { params }: Params) {
  await connectDB();

  if (!isValidObjectId(params.id))
    return Response.json({ error: 'Invalid recipe Id!' }, { status: 422 });

  const recipe = await Recipe.findByIdAndDelete(params.id);

  if (!recipe)
    return Response.json({ error: 'Could not find recipe!' }, { status: 404 });

  return Response.json({ status: 'Success' });
}
