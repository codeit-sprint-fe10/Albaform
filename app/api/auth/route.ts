import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAMES, COOKIE_OPTIONS } from '@/constants/api';

type VarName = keyof typeof COOKIE_NAMES;

export const GET = async () => {
  const cookieStore = await cookies();

  const resBody = Object.entries(COOKIE_NAMES).reduce(
    (acc, [varName, cooName]) => {
      acc[varName as VarName] = cookieStore.get(cooName)?.value || null;
      return acc;
    },
    {} as Record<VarName, string | null>,
  );

  return NextResponse.json(resBody, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const cookieStore = await cookies();

  const reqBody: Record<VarName, string> = await request.json();
  Object.entries(COOKIE_NAMES).forEach(([varName, cooName]) => {
    cookieStore.set(cooName, reqBody[varName as VarName], COOKIE_OPTIONS);
  });

  return NextResponse.json({ message: 'Cookies added' }, { status: 200 });
};

export const PATCH = async (request: NextRequest) => {
  const cookieStore = await cookies();

  const reqBody: Record<VarName, string> = await request.json();
  Object.entries(reqBody).forEach(([varName, value]) => {
    cookieStore.set(COOKIE_NAMES[varName as VarName], value, COOKIE_OPTIONS);
  });

  return NextResponse.json({ message: 'Cookies modified' }, { status: 200 });
};

export const DELETE = async () => {
  const cookieStore = await cookies();

  Object.values(COOKIE_NAMES).forEach((cooName) => {
    cookieStore.delete(cooName);
  });

  return NextResponse.json({ message: 'Cookies deleted' }, { status: 200 });
};
