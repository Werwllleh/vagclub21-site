import {NextResponse} from "next/server";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {protectAuthPages} from "@/server-actions/middlewares/protect-auth.middleware";

/*
export async function middleware(request) {
  const pathname = request.nextUrl.pathname

  console.log(pathname)

  if (pathname.startsWith(PROTECTED_PAGES.PROFILE) || pathname.startsWith(PROTECTED_PAGES.PARTNERS)) {
    return protectAuthPages(request)
  }


  return NextResponse.next()
}
*/

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
/*  console.log('Request URL:', request.url);
  console.log('Request Method:', request.method);
  console.log('Request Headers:', Object.fromEntries(request.headers.entries()));
  console.log('Cookies:', request.cookies.getAll());*/

  const pathname = request.nextUrl.pathname

  console.log(pathname)

  if (pathname.startsWith(PROTECTED_PAGES.PROFILE) || pathname.startsWith(PROTECTED_PAGES.PARTNERS)) {
    return protectAuthPages(request)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/partners'
  ],
}

