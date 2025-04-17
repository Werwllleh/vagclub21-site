'use server';
import { API_URL } from '@/constants';

export async function getUserData(accessToken) {
  try {
    const response = await fetch(`${API_URL}/protect/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`
      },
      credentials: 'include',
    });

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; // Передаем ошибку дальше
  }
}
