"use server";

import connectDB from "@/lib/helpers/connectDb";
import { getAuth } from "@/middleware";
import { ObjectId } from "mongodb";

export async function getAccountInformationAction() {
  const session = await getAuth();

  if (session) {
    const collection = (await connectDB())
      .db("yasc")
      .collection("user-account");
    return JSON.parse(
      JSON.stringify(
        await collection.findOne({ _id: new ObjectId(session._id) })
      )
    );
  }
  return null;
}
