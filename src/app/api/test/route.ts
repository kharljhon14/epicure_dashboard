import { NextResponse } from 'next/server';

import { CreateUserSchema } from '@/schemas/user';
import connectDB from '@/utils/connectDB';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const result = CreateUserSchema.safeParse(body);

  if (!result.success) {
    let errorMessage = '';
    result.error.issues.forEach((issue) => {
      errorMessage = `${errorMessage + issue.path[0]}: ${issue.message}. `;
    });

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  return NextResponse.json({
    message: 'Test connection for DB success',
  });
}
