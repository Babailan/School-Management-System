"use server";

import connectDB from "@/libs/helpers/connectDb";
import { ObjectId } from "mongodb";

/**
 * Adds a student fee to the student record.
 * @param id - The ID of the student.
 * @param year - The year of the assessment.
 * @param amount - The amount to be added to the student's balance.
 * @returns A Promise that resolves to the result of the update operation.
 */
export async function addStudentFeeAction(
  id: string,
  year: string,
  amount: number
) {
  const studentFeeCollection = (await connectDB())
    .db("yasc")
    .collection("student-record");

  const result = await studentFeeCollection.updateOne(
    {
      _id: new ObjectId(id),
      "assessment.year": year,
    },
    {
      $inc: { "assessment.$[elem].balance": amount },
    },
    {
      arrayFilters: [{ "elem.year": year }],
    }
  );

  if (result.acknowledged) {
    return {
      success: true,
      message: "Successfully added",
    };
  } else {
    return {
      success: false,
      message: "Failed to add",
    };
  }
}
