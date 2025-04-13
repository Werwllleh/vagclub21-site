'use server'

import {API_URL} from '@/constants'

export async function getNewTokensByRefresh(refreshToken) {
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: {
      data: {
        refreshToken: refreshToken
      }
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch new tokens')
  }

  const data = await response.json()
  return data
}
