import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import User from '@/models/user';
import type {
  ForgotPasswordRequestSchemaType,
  ResetPasswordRequestSchemaType,
} from '@/schemas/user';
import {
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
} from '@/schemas/user';
import connectDB from '@/utils/connectDB';
import {
  FORGOT_PASSWORD_TOKEN_SECRET,
  NEXT_BASE_URL,
} from '@/utils/enviromentVariables';
import { sendForgotPasswordTokenEmail } from '@/utils/mail';
import { schemaValidator } from '@/utils/schemaValidator';
import { createForgotPasswordToken } from '@/utils/token';

export async function POST(req: Request) {
  await connectDB();

  const body: ForgotPasswordRequestSchemaType = await req.json();

  const error = schemaValidator(ForgotPasswordRequestSchema, body);

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const user = await User.findOne({ email: body.email });

  if (!user)
    return Response.json({ error: 'Could not find user!' }, { status: 404 });

  const forgotPasswordToken = createForgotPasswordToken({
    id: user._id.toString(),
    name: user.name,
  });

  const url = `${NEXT_BASE_URL}/reset-password/${forgotPasswordToken}`;

  await sendForgotPasswordTokenEmail(
    {
      name: user.name,
      email: user.email,
    },
    url
  );

  return Response.json({ status: 'Success' });
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const body: ResetPasswordRequestSchemaType & { token: any } =
      await req.json();

    const result = jwt.verify(body.token, FORGOT_PASSWORD_TOKEN_SECRET) as {
      id: string;
    };

    const id = new ObjectId(result.id);

    const error = schemaValidator(ResetPasswordRequestSchema, body);

    if (error) return Response.json({ error }, { status: 400 });

    const user = await User.findById(id);

    if (!user)
      return Response.json({ error: 'Could not find user!' }, { status: 404 });

    const matched = await user.comparePassword(body.password);

    if (matched)
      return Response.json(
        { error: 'Password must be different from old password!' },
        { status: 403 }
      );

    user.password = body.password;
    await user.save();

    return Response.json({ status: 'Success' });
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return Response.json(
        {
          error: 'Password reset request expired!',
          errorMessage: 'Oops! Something went wrong',
        },
        { status: 422 }
      );

    return Response.json(
      {
        error: 'Something when wrong!',
        errorMessage: 'Oops! Something went wrong',
      },
      { status: 500 }
    );
  }
}
