import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAMES, COOKIE_OPTIONS } from '@/constants/api';

type JSCookieName = keyof typeof COOKIE_NAMES;

export const GET = async () => {
  const cookieStore = await cookies();

  const resBody = Object.entries(COOKIE_NAMES).reduce(
    (acc, [jsCookieName, cookieName]) => {
      acc[jsCookieName as JSCookieName] =
        cookieStore.get(cookieName)?.value || null;
      return acc;
    },
    {} as Record<JSCookieName, string | null>,
  );

  return NextResponse.json(resBody, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const cookieStore = await cookies();

  const reqBody: Record<JSCookieName, string> = await request.json();
  Object.entries(COOKIE_NAMES).forEach(([jsCookieName, cookieName]) => {
    cookieStore.set(
      cookieName,
      reqBody[jsCookieName as JSCookieName],
      COOKIE_OPTIONS,
    );
  });

  return NextResponse.json({ message: 'Cookies added' }, { status: 200 });
};

export const PATCH = async (request: NextRequest) => {
  const cookieStore = await cookies();

  const reqBody: Record<JSCookieName, string> = await request.json();
  Object.entries(reqBody).forEach(([jsCookieName, value]) => {
    cookieStore.set(
      COOKIE_NAMES[jsCookieName as JSCookieName],
      value,
      COOKIE_OPTIONS,
    );
  });

  return NextResponse.json({ message: 'Cookies modified' }, { status: 200 });
};

export const DELETE = async () => {
  const cookieStore = await cookies();

  Object.values(COOKIE_NAMES).forEach((cookieName) => {
    cookieStore.delete(cookieName);
  });

  return NextResponse.json({ message: 'Cookies deleted' }, { status: 200 });
};
