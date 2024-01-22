import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { ACTIVATE_TOKEN_SECRET } from '@/utils/enviromentVariables';

export interface UserToken {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await connectDB();

  const { token } = await req.json();

  try {
    const result = jwt.verify(token, ACTIVATE_TOKEN_SECRET) as UserToken;
    console.log(result);

    const user = await User.findOne({ name: result.name, email: result.email });

    console.log(user);
    if (user)
      return Response.json(
        {
          error: 'Account already verified!',
          errorMessage: 'This account has already been verified.',
        },
        { status: 422 }
      );

    const newUser = new User({
      name: result.name,
      email: result.email,
      password: result.password,
    });

    await newUser.save();

    return Response.json({ message: 'Account activated!' });
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return Response.json(
        { error: 'Invalid token!', errorMessage: 'Oops! Something went wrong' },
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
