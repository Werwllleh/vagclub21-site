import { NextResponse } from 'next/server'

export function nextRedirect(toUrl, currentUrl) {
  return NextResponse.redirect(new URL(toUrl, currentUrl))
}
