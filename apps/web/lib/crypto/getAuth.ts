import { cookies } from "next/headers";
import { unsealData } from "iron-session";

/**
 * Retrieves the authenticated user's data from the token stored in the cookies.
 * @returns The unsealed data of the authenticated user, or null if the token is missing or invalid.
 * @throws Error if the iron_key environment variable is missing.
 */

export const getAuth = async () => {
  if (process.env.iron_key === undefined) {
    throw new Error("Missing iron_key environment variable");
  }
  const token = cookies().get("user_token")?.value;
  if (!token) return null;

  const unsealed = await unsealData<any>(token as string, {
    password: process.env.iron_key,
  });
  if (unsealed === null || Object.keys(unsealed).length === 0) {
    return null;
  }

  return unsealed;
};
