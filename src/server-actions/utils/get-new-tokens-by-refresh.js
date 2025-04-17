'use server'
import {API_URL} from '@/constants'

export async function getNewTokensByRefresh(refreshToken) {
  const response = await fetch(`${API_URL}/auth/access-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch new tokens')
  }

  return await response.json()
}
