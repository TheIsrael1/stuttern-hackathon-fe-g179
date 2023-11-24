import { ResponseError } from "@/lib/error";

export const COMMON_HEADER: RequestInit = {
  next: { revalidate: 60 },
  cache: "default",
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function myFetch(
  ...options: Parameters<typeof fetch>
): Promise<Response> {
  const res = await fetch(...options);

  if (!res.ok) {
    throw new ResponseError("Bad fetch response", res);
  }

  return res;
}
