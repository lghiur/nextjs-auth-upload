import {
  NextRequest,
  NextFetchEvent,
  NextMiddleware,
  NextResponse,
} from 'next/server';
import { JWTPayload } from 'jose';


import { decrypt } from '@/services/session';
import { cookies } from 'next/headers';

const protectedRoutes = ['dashboard', '']
const publicRoutes = ['login', 'signup']

export default function authMiddleware (next: NextMiddleware) {
  return async (req: NextRequest, ev: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split('/')[1];
    const isProtectedRoute = protectedRoutes.includes(pathname);

    const sessionCookie = cookies().get('session')?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if(isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if(!isProtectedRoute && session?.userId && !protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return next(req, ev);
  };
};
