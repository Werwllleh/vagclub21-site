import {NextResponse} from "next/server";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {protectAuthPages} from "@/server-actions/middlewares/protect-auth.middleware";
import {nextRedirect} from "@/server-actions/utils/next-redirect";
import Cookies from "js-cookie";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {ProtectAuthTelegramMiddleware} from "@/server-actions/middlewares/protect-auth-telegram.middleware";
import {ProtectRegisterPageMiddleware} from "@/server-actions/middlewares/protect-register-page.middleware";



export async function middleware(request) {

  const {pathname} = request.nextUrl


  if (pathname === '/quest') {
    return nextRedirect('/', request.url)
  }

  if (pathname.startsWith(PROTECTED_PAGES.PROFILE) || pathname.startsWith(PROTECTED_PAGES.PARTNERS)) {
    return protectAuthPages(request)
  }

  if (pathname.startsWith(PUBLIC_PAGES.LOGIN)) {
    return ProtectAuthTelegramMiddleware(request)
  }

  if (pathname.startsWith(PUBLIC_PAGES.REGISTER)) {
    return ProtectRegisterPageMiddleware(request)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/auth/login',
    '/auth/register',
    '/quest',
    '/profile',
    '/partners'
  ],
}

