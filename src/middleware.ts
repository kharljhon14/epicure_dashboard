import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const authenticatedRoutes = [pathName.startsWith('/user')];
  const restrictedRoutes = [
    pathName.startsWith('/reset-password'),
    pathName.startsWith('/activate'),
  ];

  if (authenticatedRoutes.includes(true)) {
    const cookie = request.cookies.get('session');

    if (!cookie || !cookie?.value)
      return NextResponse.redirect(new URL('/', request.url));
  }

  if (restrictedRoutes.includes(true)) {
    const cookie = request.cookies.get('session');

    if (cookie && cookie.value)
      return NextResponse.redirect(new URL('/user', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
