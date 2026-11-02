import { headers } from "next/headers";
import { auth } from "./auth";

export async function getTokenFromServer() {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken?.token;
  return token;
}
