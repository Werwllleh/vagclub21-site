'use server'

import {nextRedirect} from "@/server-actions/middlewares/utils/next-redirect";
import {NextResponse} from "next/server";

export async function middleware(request) {

  const pathname = request.nextUrl.pathname

  if (pathname === '/quest') {
    return nextRedirect('/', request.url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/quest',
  ],
}
