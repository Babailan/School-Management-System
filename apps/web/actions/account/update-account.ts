"use server";

import connectDB from "@/lib/helpers/connectDb";
import { getAuth } from "@/middleware";
import { ObjectId } from "mongodb";

//change theme
export async function accountChangeThemeAction(theme: "dark" | "light") {
  const session = await getAuth();

  if (session) {
    const collection = (await connectDB())
      .db("yasc")
      .collection("user-account");
    // update the user's theme
    const user = await collection.findOneAndUpdate(
      { _id: new ObjectId(session._id) },
      { $set: { theme: theme } }
    );
  }
  return {};
}
