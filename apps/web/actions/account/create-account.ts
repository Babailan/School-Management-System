"use server";

import { hashPassword } from "@/lib/crypto/password";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import _ from "lodash";

export async function createAccountAction(user: Record<string, any>) {
  user = deepLowerCase(user);

  const collection = (await connectDB()).collection("user-account");
  if (await collection.findOne({ email: user.email })) {
    return { message: "Email already exist", success: false };
  }
  // lastName, firstName, middleName
  user.fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;

  await collection.insertOne(
    _.merge(user, { password: await hashPassword(user.password) })
  );
  return { message: "Successfull Added", success: true };
}
