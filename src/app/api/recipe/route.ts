import connectDB from '@/utils/connectDB';

export async function POST(req: Request) {
  await connectDB();

  Response.json({ status: 'Success' });
}
