"use server";

import { connectDB } from "@/lib/helpers";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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
      $addToSet: {
        "assessment.$.history": {
          amount: amount,
          issue_date: new Date(),
        },
      },
    }
  );
  revalidatePath("/", "layout");
  return {
    success:true,
    message:"Amount is added."
  }
}
