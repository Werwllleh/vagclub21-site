'use server'

import { getTokensFromRequest } from '@/server-actions/utils/get-tokens-from-request'
import { jwtVerifyServer } from '@/server-actions/utils/jwt-verify'
import { nextRedirect } from '@/server-actions/utils/next-redirect'
import {NextResponse} from "next/server";

export async function protectAuthPages(request) {

  const tokens = await getTokensFromRequest(request)
  if (!tokens) return NextResponse.next()

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return NextResponse.next()

  return nextRedirect(request.url, request.url)
}
