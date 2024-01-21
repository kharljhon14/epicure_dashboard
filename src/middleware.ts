import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const authenticatedAPIRoutes = [pathName.startsWith('/user')];

  if (authenticatedAPIRoutes.includes(true)) {
    const cookie = request.cookies.get('session');

    if (!cookie || !cookie?.value)
      return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
