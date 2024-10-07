import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running');
  const path = request.nextUrl.pathname;
  const hostname = request.headers.get("host");
  
  console.log("This is hostname:", hostname);
  
  /*if (hostname) {
    if (hostname === "my-app-two-delta-88.vercel.app/") {
     
      console.log("apiRewriteUrl:", hostname);
     
    } else {
      const subdomain = hostname.split(".")[0]; // Extract the subdomain
      console.log("Subdomain:", subdomain);
      
      // Rewrite the path to /client/{subdomain}
      const apiRewriteUrl = request.nextUrl.clone();
      apiRewriteUrl.pathname = `/client/${subdomain}`; 
      console.log("apiRewriteUrl:", apiRewriteUrl.href);
      return NextResponse.rewrite(apiRewriteUrl);
    }
  }*/

  const isPublic = path === '/' || path === '/admin/login' || path === '/client/login';

  const clientToken = request.cookies.get("token")?.value || '';
  const adminToken = request.cookies.get("token1")?.value || '';

  console.log("Admin Token:", adminToken);
  console.log("Client Token:", clientToken);

  if (isPublic && adminToken) {
    console.log('Admin is logged in, redirecting to /admin/dashbord');
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
    '/admin/dashbord' // Fixed typo here
  ],
};
