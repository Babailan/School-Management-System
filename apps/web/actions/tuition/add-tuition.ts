"use server";

import { deepLowerCase } from "@/lib/helpers";
import { connectDB } from "@/lib/helpers/connectDb";

export async function addTuitionAction(tuition_name, amount) {
  const tuitionCollection = (await connectDB()).collection("tuition");

  const isExist = await tuitionCollection.findOne({
    tuition_title: String(tuition_name).toLowerCase(),
  });
  if (isExist) {
    return {
      success: false,
      message: "Tuition title already exist",
    };
  }

  const result = await tuitionCollection.insertOne(
    deepLowerCase({
      tuition_title: tuition_name,
      amount: amount,
    })
  );

  return {
    success: true,
    message: "Successfully added",
  };
}
