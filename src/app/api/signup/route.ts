import User from '@/models/user';
import type { CreateUserSchemaType } from '@/schemas/user';
import { CreateUserSchema } from '@/schemas/user';
import connectDB from '@/utils/connectDB';
import { schemaValidator } from '@/utils/schemaValidator';

export async function POST(req: Request) {
  await connectDB();

  const body: CreateUserSchemaType = await req.json();

  const error = schemaValidator(CreateUserSchema, body);

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const newUser = new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  await newUser.save();

  return Response.json({
    message: 'User created!',
    user: { _id: newUser._id, name: newUser.name, email: newUser.email },
  });
}