import {NextResponse} from "next/server";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {protectAuthPages} from "@/server-actions/middlewares/protect-auth.middleware";
import {nextRedirect} from "@/server-actions/utils/next-redirect";
import Cookies from "js-cookie";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {ProtectLoginPagesMiddleware} from "@/server-actions/middlewares/protect-login-pages.middleware";



export async function middleware(request) {

  const {pathname} = request.nextUrl


  if (pathname === '/quest') {
    return nextRedirect('/', request.url)
  }

  if (pathname.startsWith(PROTECTED_PAGES.PROFILE) || pathname.startsWith(PROTECTED_PAGES.PARTNERS)) {
    return protectAuthPages(request)
  }

  if (pathname.startsWith(PUBLIC_PAGES.AUTH)) {
    // return ProtectLoginPagesMiddleware(request)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/auth/login',
    '/quest',
    '/profile',
    '/partners'
  ],
}

