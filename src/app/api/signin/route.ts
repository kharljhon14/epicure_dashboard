import { cookies } from 'next/headers';

import User from '@/models/user';
import connectDB from '@/utils/connectDB';
import { createSessionToken } from '@/utils/token';

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user)
    return Response.json({ error: 'Invalid credentials!' }, { status: 403 });

  const matched = await user.comparePassword(password);

  if (!matched)
    return Response.json({ error: 'Invalid credentials!' }, { status: 403 });

  const sessionToken = createSessionToken({
    id: user._id.toString(),
    name: user.name,
  });

  user.tokens.push(sessionToken);

  await user.save();

  const cookieStore = cookies();

  const oneDay = 60 * 60 * 24;

  cookieStore.set('session', sessionToken, { maxAge: oneDay });

  return Response.json({ stutus: 'Success' });
}
