"use server";

import connectDB from "@/lib/helpers/connectDb";

export async function getAllTuitionFee() {
  const tuitionCollection = (await connectDB()).collection("tuition");

  return JSON.parse(JSON.stringify(await tuitionCollection.find({}).toArray()));
}
