import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { ACTIVATE_TOKEN_SECRET } from '@/utils/enviromentVariables';

interface UserToken {
  token: string;
  id: string;
}

export async function POST(req: Request) {
  await connectDB();

  const { token } = await req.json();

  try {
    const result = jwt.verify(token, ACTIVATE_TOKEN_SECRET) as UserToken;
    const id = new ObjectId(result.id);

    const user = await User.findById(id);

    if (!user)
      return Response.json({ error: 'Could not find user' }, { status: 404 });

    if (user.verified)
      return Response.json(
        { error: 'Account already verified' },
        { status: 422 }
      );

    await User.findOneAndUpdate(id, { verified: true });
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return Response.json({ error: err.message });
  }

  return Response.json({ message: 'Account activated!' });
}
