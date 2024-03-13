"use server";

import connectDB from "@/libs/helpers/connectDb";
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Logs in a user account.
 *
 * @param formData - The form data containing the email and password.
 * @returns An object indicating the success of the login and a message.
 * @throws An error if the iron_key environment variable is missing.
 */
export async function LoginAccountAction(email: string, password: string) {
  if (!process.env.iron_key) {
    throw new Error("Missing iron_key environment variable");
  }

  const account_collection = (await connectDB())
    .db("yasc")
    .collection("user_account");
  const result = await account_collection.findOne({ email });
  if (!result) {
    return { success: false, message: "Email not found" };
  }
  if (result.password !== password) {
    return { success: false, message: "Invalid password" };
  }

  const ttl = 60 * 60 * 24;
  delete result.password;
  const session = await sealData(result, {
    password: process.env.iron_key,
    ttl: ttl,
  });

  cookies().set("user_token", session, { expires: ttl * 1000 + Date.now() });

  redirect("/");
}
