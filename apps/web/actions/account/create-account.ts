"use server";

import { hashPassword } from "@/lib/crypto/password";
import { deepLowerCase } from "@/lib/helpers";
import { connectDB } from "@/lib/helpers/connectDb";
import _ from "lodash";
import { getValidatePIN } from "./get-account";
import { wait } from "@/lib/helpers/wait";

export async function createAccountAction(formObject: Record<string, any>) {
  await wait(3000);
  const validatePIN = await getValidatePIN(formObject.pin);

  if (!validatePIN.success) {
    return validatePIN;
  }
  formObject = deepLowerCase(formObject);

  const collection = (await connectDB()).collection("user-account");
  if (await collection.findOne({ email: formObject.email })) {
    return { message: "Email address already in use. Please try another.", success: false };
  }
  if (await collection.findOne({ username: formObject.username })) {
    return { message: "Username already in use. Please try another.", success: false };
  }
  formObject.fullName =
    `${formObject.lastName} ${formObject.firstName} ${formObject.middleName}`.trim();

  await collection.insertOne(
    _.omit(
      _.merge(formObject, {
        password: await hashPassword(formObject.password),
      }),
      ["pin"]
    )
  );
  return { message: "Successfull Added", success: true };
}
