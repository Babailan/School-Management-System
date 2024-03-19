"use server";

import connectDB from "@/lib/helpers/connectDb";

export async function addTuitionAction(tuition_name, amount) {
  const tuitionCollection = (await connectDB())
    .db("yasc")
    .collection("tuition");

  const isExist = await tuitionCollection.findOne({
    tuition_title: tuition_name,
  });
  if (isExist) {
    return {
      success: false,
      message: "Tuition title already exist",
    };
  }

  const result = await tuitionCollection.insertOne({
    tuition_title: tuition_name,
    amount: amount,
  });

  return {
    success: true,
    message: "Successfully added",
  };
}
