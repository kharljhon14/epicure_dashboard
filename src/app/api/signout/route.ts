import { cookies } from 'next/headers';

import connectDB from '@/utils/connectDB';

export async function GET() {
  await connectDB();

  const cookieStore = cookies();

  cookieStore.delete('session');

  return Response.json({ stutus: 'Success' });
}
