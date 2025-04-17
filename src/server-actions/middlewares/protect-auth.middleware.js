'use server'

import {getTokensFromRequest} from '@/server-actions/utils/get-tokens-from-request'
import {jwtVerifyServer} from '@/server-actions/utils/jwt-verify'
import {nextRedirect} from '@/server-actions/utils/next-redirect'
import {NextResponse} from "next/server";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {getUserData} from "@/server-actions/utils/get-user-data";

export async function protectAuthPages(request) {
  try {
    // Получаем токены из запроса
    const tokens = await getTokensFromRequest(request);
    if (!tokens) {
      return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
    }

    // Проверяем валидность токена
    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) {
      return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
    }

    // Получаем данные пользователя
    const user = await getUserData(tokens.accessToken);

    // Проверяем, есть ли данные профиля
    if (!user.user) {
      return nextRedirect(PUBLIC_PAGES.REGISTER, request.url);
    }

    // Разрешаем доступ к защищенной странице
    return NextResponse.next();
  } catch (error) {
    console.error('Error in protectAuthPages:', error.message);
    return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
  }
}
