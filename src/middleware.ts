import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running'); 
  const path = request.nextUrl.pathname;
  const isPublic = path === '/' || path === '/admin/login' || path === '/client/login';

  const token = request.cookies.get("token")?.value || '';
  const token1 = request.cookies.get("token1")?.value || '';
console.log("token1",token1);
  //console.log(`Path: ${path}, Token: ${token}`);
  if (isPublic && token1) {
    console.log('Redirecting to /'); 
    return NextResponse.redirect(new URL('/admin', request.url));
  }

 else if (isPublic && token) {
    console.log('Redirecting to /'); 
    return NextResponse.redirect(new URL('/client', request.url));
  }
  if (!isPublic && !token && !token1) {
    console.log('Redirecting to /'); 
    return NextResponse.redirect(new URL('/', request.url));
  }
}


export const config = {
  matcher: [
    '/',
    '/admin/login',
    '/admin',
    '/admin/addclient',
    '/admin/deleteclient',
    '/client'
  ]
};