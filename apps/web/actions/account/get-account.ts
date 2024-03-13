"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GetAccountInformationAction(): Promise<any> {
  if (!process.env.iron_key) {
    throw new Error("Missing iron_key environment variable");
  }
  const session = await getIronSession(cookies(), {
    cookieName: "user_session",
    password: process.env.iron_key,
  });
  return session;
}
