import { hash } from 'bcrypt';

import User from '@/models/user';
import type { CreateUserSchemaType } from '@/schemas/user';
import { CreateUserSchema } from '@/schemas/user';
import connectDB from '@/utils/connectDB';
import { NEXT_BASE_URL } from '@/utils/enviromentVariables';
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

  const hashedPassword = await hash(body.password, 10);

  const activationToken = createActivationToken({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  const url = `${NEXT_BASE_URL}/activate/${activationToken}`;

  sendVericifationTokenEmail(
    {
      name: body.name,
      email: body.email,
    },
    url
  );

  return Response.json({
    status: 'Success',
  });
}
