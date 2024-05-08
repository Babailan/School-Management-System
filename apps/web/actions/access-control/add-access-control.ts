"use server";

import { hashPassword } from "@/lib/crypto/password";
import { connectDB, deepLowerCase } from "@/lib/helpers";
import { wait } from "@/lib/helpers/wait";
import _ from "lodash";
import { getValidatePIN } from "../account/get-account";

export async function createAccountAction(formObject: Record<string, any>) {
  await wait(1000);
  const validatePIN = await getValidatePIN(formObject.pin);

  if (!validatePIN.success) {
    return validatePIN;
  }
  formObject.fullName =
    `${formObject.lastName} ${formObject.firstName} ${formObject.middleName}`.trim();
  formObject = deepLowerCase(formObject);

  const collection = (await connectDB()).collection("user-account");
  if (await collection.findOne({ email: formObject.email })) {
    return {
      message: "Email address already in use. Please try another.",
      success: false,
    };
  }
  if (await collection.findOne({ username: formObject.username })) {
    return {
      message: "Username already in use. Please try another.",
      success: false,
    };
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
