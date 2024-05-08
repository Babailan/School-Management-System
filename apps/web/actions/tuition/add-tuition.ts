"use server";

import { deepLowerCase } from "@/lib/helpers";
import { connectDB } from "@/lib/helpers/connectDb";
import { revalidatePath } from "next/cache";

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

   await tuitionCollection.insertOne(
    deepLowerCase({
      tuition_title: tuition_name,
      amount: amount,
    })
  );
  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Successfully added",
  };
}
