import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running');
  const path = request.nextUrl.pathname;
  const isPublic = path === '/' || path === '/admin/login' || path === '/client/login';


  const clientToken = request.cookies.get("token")?.value || '';
  const adminToken = request.cookies.get("token1")?.value || '';

  console.log("Admin Token:", adminToken);
  console.log("Client Token:", clientToken);

  
  if (isPublic && adminToken) {
    console.log('Admin is logged in, redirecting to /admin/dashboard');
    return NextResponse.redirect(new URL('/admin/dashbord', request.url));
  }

  
  if (isPublic && clientToken) {
    console.log('Client is logged in, redirecting to /client');
    return NextResponse.redirect(new URL('/client', request.url));
  }


  if (path.startsWith('/client') && adminToken) {
    console.log('Admin access to /client is blocked, redirecting to /admin/dashboard');
    return NextResponse.redirect(new URL('/admin/dashbord', request.url));
  }


  if (path.startsWith('/admin') && clientToken) {
    console.log('Client access to /admin is blocked, redirecting to /client');
    return NextResponse.redirect(new URL('/client', request.url));
  }

  
  if (!isPublic && !clientToken && !adminToken) {
    console.log('Redirecting to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  console.log('No redirects needed, allowing access to:', path);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',                         
    '/admin/login',               
    '/client/login',              
    '/admin/addclient',             
    '/admin/deleteclient',  
    '/client',
    '/admin/dashbord'
               
  ],
};
