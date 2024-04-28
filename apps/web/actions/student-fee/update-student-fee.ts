"use server";

import { connectDB } from "@/lib/helpers";
import { ObjectId } from "mongodb";

export async function updateStudentFeeAmount(
  studentId: string,
  assessmentId: string,
  amount: number
) {
  const collection = (await connectDB()).collection("students");
  await collection.updateOne(
    {
      _id: new ObjectId(studentId),
      "assessment._id": new ObjectId(assessmentId),
    },
    {
      $inc: {
        "assessment.$.amount": -amount,
      },
    }
  );
}
