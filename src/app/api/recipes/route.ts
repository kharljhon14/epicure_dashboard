import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

import Recipe from '@/models/recipe';
import type { UserDocument } from '@/models/user';
import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';
import { authenticated } from '@/utils/auth';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import connectDB from '@/utils/connectDB';
import { PAGINATION_LIMIT } from '@/utils/contansts';
import { schemaValidator } from '@/utils/schemaValidator';

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const search = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');
  const owner = searchParams.get('owner');

  const query = { name: { $regex: search ?? '', $options: 'i' } } as any;

  if (owner && owner !== '') {
    query['owner.id'] = new ObjectId(owner);
  }

  const page = parseInt(pageNumber ?? '1', 10) - 1;
  const total = await Recipe.countDocuments(query);
  const recipes = await Recipe.find(query)
    .skip(page * PAGINATION_LIMIT)
    .limit(PAGINATION_LIMIT)
    .sort('-createdAt');

  return Response.json({
    status: 'Success',
    recipes,
    total,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.formData();

    const body = Object.fromEntries(data) as RecipeSchemaType;

    const error = schemaValidator(RecipeSchema, body);

    if (error) return Response.json({ error }, { status: 422 });

    const cookieStore = cookies();

    const token = cookieStore.get('session');

    if (!token?.value)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 401 }
      );

    const user: UserDocument | null = await authenticated(token.value);

    if (!user)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 401 }
      );

    const recipe = new Recipe({
      owner: { id: user._id, name: user.name },
      ...body,
    });

    if (body.image) {
      const arrayBuffer = await body.image.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');
      const fileUri = `data:${body.image.type};base64,${base64Data}`;

      const result = await uploadImageToCloudinary(fileUri);

      if (result)
        recipe.image = {
          url: result.secure_url,
          publicId: result.public_id,
        };
    }

    await recipe.save();

    return Response.json({ status: 'Success', recipe });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ error: err.message }, { status: 500 });

    return Response.json({ error: 'Internal server error!' }, { status: 500 });
  }
}
