"use server";

import connectDB from "@/libs/helpers/connectDb";

export async function getTuitionAction() {
  const tuitionCollection = (await connectDB())
    .db("yasc")
    .collection("tuition");
  return await tuitionCollection.find({}).toArray();
}
