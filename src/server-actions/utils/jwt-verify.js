'use server'
import * as jose from 'jose'

export async function jwtVerifyServer(accessToken) {
  try {
    const { payload } = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    )

    if (!payload) return null
    return payload;
    // return transformUserToState(payload)
  } catch (error) {
    // Обработка ошибок, связанных с верификацией JWT
    if (
      error instanceof Error &&
      error.message.includes('exp claim timestamp check failed')
    ) {
      // Токен истек
      console.log('Токен истек')
      return null
    }

    console.log('Ошибка при верификации токена: ', error)
    return null
  }
}
