import Cookies from 'js-cookie';

// Токены (accessToken/refreshToken) — httpOnly, из JS недоступны.
// Поэтому храним лёгкий НЕ-httpOnly маркер сессии, чтобы клиент понимал,
// нужно ли вообще запрашивать защищённые данные (иначе аноним ловит 401).
const SESSION_MARKER = 'auth';
const cookieDomain = process.env.NEXT_PUBLIC_URL_COOKIE_DOMAIN;

class AuthTokenService {
  notifyChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-session-change'));
    }
  }

  hasSession() {
    return !!Cookies.get(SESSION_MARKER);
  }

  setSession() {
    Cookies.set(SESSION_MARKER, '1', {
      domain: cookieDomain,
      sameSite: 'lax',
      expires: 30, // 30 дней для долгой сессии
    });
    this.notifyChange();
  }

  clearSession() {
    Cookies.remove(SESSION_MARKER, {domain: cookieDomain});
    this.notifyChange();
  }
}

export default new AuthTokenService();
