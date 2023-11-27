import { ResponseError } from '@/lib/error';

export const COMMON_HEADER: RequestInit = {
  headers: {
    'Content-type': 'application/json'
  },
  next: { revalidate: 0 },
  cache: 'no-cache'
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function myFetch(...options: Parameters<typeof fetch>): Promise<Response> {
  const res = await fetch(...options);

  if (!res.ok) {
    const err = await res.json();
    throw new ResponseError(`${err?.detail ?? `Bad fetch response`}`, res);
  }

  return res;
}

export const bearifyToken = (i: string) => {
  return `Bearer ${i}`;
};
