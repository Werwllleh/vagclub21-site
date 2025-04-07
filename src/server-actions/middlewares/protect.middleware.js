'use server'

import { NextRequest, NextResponse } from 'next/server'

import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { nextRedirect } from './utils/next-redirect'
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

export async function protectPages(request) {
  const tokens = await getTokensFromRequest(request)
  if (!tokens) return NextResponse.next()

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return NextResponse.next()

  return nextRedirect(PROTECTED_PAGES.PROFILE, request.url)
}
