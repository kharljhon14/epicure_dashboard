import { cookies } from 'next/headers';

import Recipe from '@/models/recipe';
import type { UserDocument } from '@/models/user';
import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';
import { authenticated } from '@/utils/auth';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import connectDB from '@/utils/connectDB';
import { schemaValidator } from '@/utils/schemaValidator';

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const search = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');
  const limit = 8;

  const page = parseInt(pageNumber ?? '1', 10) - 1;
  const total = await Recipe.countDocuments();
  const recipes = await Recipe.find({
    name: { $regex: search ?? '', $options: 'i' },
  })
    .skip(page * limit)
    .limit(limit)
    .sort('-createdAt');

  return Response.json({
    status: 'Success',
    recipes,
    total: search !== '' ? recipes.length : total,
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
      const buffer = new Uint8Array(arrayBuffer);

      const result = await uploadImageToCloudinary(buffer);

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
