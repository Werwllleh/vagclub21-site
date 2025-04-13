import { AuthToken } from '@/constants'
import { NextRequest } from 'next/server'
import { getNewTokensByRefresh } from './get-new-tokens-by-refresh'
import {getAuthorizationField} from "@/server-actions/utils/get-auth-header";
import AuthTokenService from "@/services/auth-token.service";

export async function getTokensFromRequest(request) {

  const refreshToken = request.cookies.get(AuthToken.REFRESH_TOKEN)?.value
  let accessToken = getAuthorizationField(request)

  if (!refreshToken) {
    request.cookies.delete(AuthToken.ACCESS_TOKEN)
    return null
  }

  if (!accessToken) {
    try {
      const data = await getNewTokensByRefresh(refreshToken)
      accessToken = data.accessToken
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'invalid token') {
          console.log('не валидный токен')
          request.cookies.delete(AuthToken.ACCESS_TOKEN)
          return null
        }
      }
      return null
    }
  }

  return { accessToken, refreshToken }
}
