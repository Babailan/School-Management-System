"use server";

import { hashPassword } from "@/lib/crypto/password";
import { connectDB, deepLowerCase } from "@/lib/helpers";
import _ from "lodash";
import { getValidatePIN } from "../account/get-account";
import { ObjectId } from "mongodb";

export async function updateAccessControlAction(
  formObject: Record<string, any>,
  _id
) {
  const validatePIN = await getValidatePIN(formObject.pin);

  if (!validatePIN.success) {
    return validatePIN;
  }
  formObject.fullName =
    `${formObject.lastName} ${formObject.firstName} ${formObject.middleName}`.trim();
  formObject = deepLowerCase(formObject);

  const collection = (await connectDB()).collection("user-account");

  await collection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: _.omit(
        _.merge(formObject, {
          password: await hashPassword(formObject.password),
        }),
        ["pin"]
      ),
    }
  );
  return { message: "Successfull Added", success: true };
}
