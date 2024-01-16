import User from '@/models/user';
import type { CreateUserSchemaType } from '@/schemas/user';
import { CreateUserSchema } from '@/schemas/user';
import connectDB from '@/utils/connectDB';
import { NEXT_BASE_URL } from '@/utils/enviromentVariables';
import { generateToken } from '@/utils/helper';
import { sendVericifationTokenEmail } from '@/utils/mail';
import { schemaValidator } from '@/utils/schemaValidator';
import { createActivationToken } from '@/utils/token';

export async function POST(req: Request) {
  await connectDB();

  const body: CreateUserSchemaType = await req.json();

  const error = schemaValidator(CreateUserSchema, body);

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const doesEmailExist = await User.findOne({ email: body.email });

  if (doesEmailExist)
    return Response.json({ error: 'Email already exsist!' }, { status: 409 });

  const newUser = new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  await newUser.save();

  const token = generateToken();

  const activationToken = createActivationToken({
    token,
    id: newUser._id.toString(),
  });

  const url = `${NEXT_BASE_URL}/activate/${activationToken}`;

  sendVericifationTokenEmail(
    {
      name: newUser.name,
      email: newUser.email,
    },
    url
  );

  return Response.json({
    message: 'Please check your email to activate you account!',
  });
}
