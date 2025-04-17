import {getTokensFromRequest} from "@/server-actions/utils/get-tokens-from-request";
import {nextRedirect} from "@/server-actions/utils/next-redirect";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {jwtVerifyServer} from "@/server-actions/utils/jwt-verify";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

export async function ProtectLoginPagesMiddleware(request) {

  const tokens = await getTokensFromRequest(request)
  if (!tokens) return nextRedirect(PUBLIC_PAGES.LOGIN, request.url)

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return nextRedirect(PUBLIC_PAGES.LOGIN, request.url)

  return nextRedirect(PROTECTED_PAGES.PROFILE, request.url)
}

