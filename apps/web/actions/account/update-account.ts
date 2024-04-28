"use server";

import { comparePassword, hashPassword } from "@/lib/crypto/password";
import { connectDB } from "@/lib/helpers/connectDb";
import { getAuth } from "@/lib/crypto/getAuth";
import { addedDiff, updatedDiff } from "deep-object-diff";
import { sealData } from "iron-session";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { wait } from "@/lib/helpers/wait";

/**
 * Updates the theme of the user's account.
 * @param theme The theme to be set for the user's account. Can be "dark" or "light".
 * @returns An empty object.
 */
export async function accountChangeThemeAction(theme: "dark" | "light") {
  const session = await getAuth();

  if (session) {
    const collection = (await connectDB()).collection("user-account");
    // update the user's theme
    const user = await collection.findOneAndUpdate(
      { _id: new ObjectId(session._id) },
      { $set: { theme: theme } }
    );
  }
  return {};
}

/**
 * Updates the user's profile in the user-account collection.
 *
 * @param newData - The new data to update the user's profile with.
 * @param confirmationPassword - The confirmation password for authentication.
 * @returns An object indicating the success of the update and a message.
 * @throws Error if the user is not authenticated or if the user is not found.
 */
export async function accountUpdateProfileAction(
  newData,
  confirmationPassword: string
) {
  const session = await getAuth();

  if (!session) throw new Error("Not authenticated");

  const collection = (await connectDB()).collection("user-account");
  // update the user's profile
  const user = await collection.findOne({ _id: new ObjectId(session._id) });
  if (!user) throw new Error("User not found");
  if (!(await comparePassword(confirmationPassword, user.password))) {
    return {
      success: false,
      message: "Incorrect password",
    };
  }
  const newMergeData = _.merge(
    updatedDiff(user, newData),
    addedDiff(user, newData)
  );

  await collection.updateOne(
    { _id: new ObjectId(session._id) },
    { $set: newMergeData }
  );
  await updateExistingSession();

  return {
    success: true,
    message: "Profile updated",
  };
}

export async function updateExistingSession() {
  const session = await getAuth();
  if (!process.env.iron_key)
    throw new Error("Missing iron_key environment variable");
  if (!session) throw new Error("Not authenticated");
  const collection = (await connectDB()).collection("user-account");
  const user = await collection.findOne({ _id: new ObjectId(session._id) });
  if (!user) throw new Error("User not found");
  delete user.password;
  const ttl = 60 * 60 * 24;
  const token = await sealData(user, {
    password: process.env.iron_key,
    ttl,
  });
  cookies().set("user_token", token, { expires: ttl * 1000 + Date.now() });

  return user;
}

export async function updateNonExistingPin(pin: string) {
  console.log(pin);
  const session = await getAuth();
  await wait(5000);
  const collection = (await connectDB()).collection("user-account");

  const account = await collection.findOne({ _id: new ObjectId(session._id) });

  if (!_.has(account, "pin")) {
    await collection.updateOne(
      { _id: new ObjectId(session._id) },
      {
        $set: {
          pin: await hashPassword(pin),
        },
      }
    );
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
}
