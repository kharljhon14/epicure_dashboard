import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import connectDB from '@/utils/connectDB';
import { FORGOT_PASSWORD_TOKEN_SECRET } from '@/utils/enviromentVariables';

export async function POST(req: Request) {
  await connectDB();

  const { token } = await req.json();

  try {
    jwt.verify(token, FORGOT_PASSWORD_TOKEN_SECRET);

    return Response.json({ status: 'Success' });
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
