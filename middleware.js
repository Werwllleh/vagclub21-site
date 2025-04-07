import {NextResponse} from "next/server";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname

  console.log(pathname)

  return NextResponse.next()
}
