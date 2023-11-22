import { getCurrentUser } from "./session";

export async function getAccessToken() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user.accessToken;
}