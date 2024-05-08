"use server";

import { deepLowerCase } from "@/lib/helpers";

import { connectDB } from "@/lib/helpers/connectDb";
import { ObjectId } from "mongodb";

export async function updateSubjectTeacherAction(
  sectionID,
  subjectCode,
  subjectTeacherId
) {
  const collection = (await connectDB()).collection("section");
  const update = await collection.updateOne(
    { _id: new ObjectId(sectionID), "subjects.subject_code": subjectCode },
    { $set: { "subjects.$.subject_teacher": subjectTeacherId } }
  );
}
