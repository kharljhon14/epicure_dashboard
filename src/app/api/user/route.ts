import { cookies } from 'next/headers';

import User from '@/models/user';
import { authenticated } from '@/utils/auth';
import connectDB from '@/utils/connectDB';

export async function GET() {
  try {
    await connectDB();

    const cookiesStore = cookies();

    const token = cookiesStore.get('session');

    if (!token?.value)
      return Response.json({ status: 'No User' }, { status: 200 });

    const userId = await authenticated(token.value);

    const user = await User.findById(userId);

    if (!user)
      return Response.json(
        { error: 'Must be authenticated!' },
        { status: 401 }
      );

    return Response.json({
      status: 'Success',
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (err) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
