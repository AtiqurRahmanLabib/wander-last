import { authClient } from "./auth-client";

export const GetTokenFromClient = async () => {
  const { data } = await authClient.token();
  console.log("JWT Token:", data?.token);
  const token = data?.token;
  return token;
};
