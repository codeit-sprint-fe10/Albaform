import { COOKIE_NAMES, COOKIE_OPTIONS } from '@/constants/api';
import { IS_SERVER } from '@/constants/responsive';
import axios from 'axios';

export type JSCookieName = keyof typeof COOKIE_NAMES;

export const getCookies = async () => {
  if (IS_SERVER) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const data = Object.entries(COOKIE_NAMES).reduce(
      (acc, [jsCookieName, cookieName]) => {
        acc[jsCookieName as JSCookieName] =
          cookieStore.get(cookieName)?.value || null;
        return acc;
      },
      {} as Record<JSCookieName, string | null>,
    );

    return data;
  }
  const data = await axios
    .get<Record<JSCookieName, string | null>>('/api/auth')
    .then((res) => res.data);

  return data;
};

interface PostCookiesBody {
  accessToken: string;
  refreshToken: string;
  userRole: string;
}

export const postCookies = async (body: PostCookiesBody) => {
  if (IS_SERVER) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    Object.entries(COOKIE_NAMES).forEach(([jsCookieName, cookieName]) => {
      cookieStore.set(
        cookieName,
        body[jsCookieName as JSCookieName],
        COOKIE_OPTIONS,
      );
    });
    return;
  }
  await axios.post('/api/auth', body);
};

interface PatchCookieBody {
  accessToken: string;
}

export const patchCookies = async (body: PatchCookieBody) => {
  if (IS_SERVER) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    Object.entries(body).forEach(([jsCookieName, value]) => {
      cookieStore.set(
        COOKIE_NAMES[jsCookieName as JSCookieName],
        value,
        COOKIE_OPTIONS,
      );
    });
    return;
  }
  await axios.patch('/api/auth', body);
};
