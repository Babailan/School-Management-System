"use server";

import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";

export async function createAccountAction(user: Record<string, any>) {
  // wait for 5 seconds
  user = deepLowerCase(user);

  const collection = (await connectDB()).db("yasc").collection("user-account");
  if (await collection.findOne({ email: user.email })) {
    return { message: "Email already exist", success: false };
  }
  // lastName, firstName, middleName
  user.fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
  await collection.insertOne(user);
  return { message: "Successfull Added", success: true };
}
