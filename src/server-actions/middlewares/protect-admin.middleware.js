'use server'

import {getTokensFromRequest} from '@/server-actions/utils/get-tokens-from-request'
import {jwtVerifyServer} from '@/server-actions/utils/jwt-verify'
import {nextRedirect} from '@/server-actions/utils/next-redirect'
import {NextResponse} from "next/server";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {getUserData} from "@/server-actions/utils/get-user-data";
import {hasAdminAccess, isSuperadmin} from "@/config/roles";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

// Пропускает в /admin только пользователей с ролью ADMIN/SUPERADMIN.
// Аноним/без профиля → /login; авторизован без прав → на главную.
export async function protectAdminPages(request) {
  try {
    const tokens = await getTokensFromRequest(request);
    if (!tokens) {
      return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
    }

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) {
      return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
    }

    const result = await getUserData(tokens.accessToken);
    const userData = result?.user;

    if (!userData) {
      return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
    }

    if (!hasAdminAccess(userData.roles)) {
      return nextRedirect('/', request.url);
    }

    // Назначение ролей — только для супер-администратора
    if (
      request.nextUrl.pathname.startsWith(`${PROTECTED_PAGES.ADMIN}/roles`) &&
      !isSuperadmin(userData.roles)
    ) {
      return nextRedirect(PROTECTED_PAGES.ADMIN, request.url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in protectAdminPages:', error.message);
    return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
  }
}
