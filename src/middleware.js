import {NextResponse} from "next/server";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {protectAuthPages} from "@/server-actions/middlewares/protect-auth.middleware";
import {nextRedirect} from "@/server-actions/utils/next-redirect";


export async function middleware(request) {

  const {pathname} = request.nextUrl

  console.log(request)

  if (pathname === '/quest') {
    return nextRedirect('/', request.url)
  }

  if (pathname.startsWith(PROTECTED_PAGES.PROFILE) || pathname.startsWith(PROTECTED_PAGES.PARTNERS)) {
    return protectAuthPages(request)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/quest',
    '/profile',
    '/partners'
  ],
}

