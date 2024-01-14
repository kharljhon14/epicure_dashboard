import { NextResponse } from 'next/server';

import connectDB from '@/utils/connectDB';

export async function GET() {
  await connectDB();
  return NextResponse.json({ message: 'Test connection for DB success' });
}
