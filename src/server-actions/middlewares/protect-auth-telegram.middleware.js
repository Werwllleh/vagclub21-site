import {getTokensFromRequest} from "@/server-actions/utils/get-tokens-from-request";
import {nextRedirect} from "@/server-actions/utils/next-redirect";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {jwtVerifyServer} from "@/server-actions/utils/jwt-verify";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {getUserData} from "@/server-actions/utils/get-user-data";
import {NextResponse} from "next/server";

export async function ProtectAuthTelegramMiddleware(request) {

  const tokens = await getTokensFromRequest(request)
  if (!tokens) return NextResponse.next();

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return NextResponse.next();

  // Получаем данные пользователя
  const user = await getUserData(tokens.accessToken);

  // Проверяем, есть ли данные профиля
  if (!user.user) {
    return nextRedirect(PUBLIC_PAGES.REGISTER, request.url);
  }

  return nextRedirect(PROTECTED_PAGES.PROFILE, request.url)
}

