"use server";

import connectDB from "@/lib/helpers/connectDb";
import { getAuth } from "@/middleware";
import { ObjectId } from "mongodb";

export async function getAccountInformationAction() {
  const session = await getAuth();

  if (session) {
    const collection = (await connectDB()).collection("user-account");
    return JSON.parse(
      JSON.stringify(
        await collection.findOne({ _id: new ObjectId(session._id) })
      )
    );
  }
  return null;
}

export async function getAccountsByFilter(filter) {
  // const session = await getAuth();

  const collection = (await connectDB()).collection("user-account");
  return JSON.parse(JSON.stringify(await collection.find({ filter })));
}
