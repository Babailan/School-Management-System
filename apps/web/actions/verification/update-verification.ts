"use server";
import connectDB from "@/lib/helpers/connectDb";
import { detailedDiff, diff, updatedDiff } from "deep-object-diff";
import { ObjectId } from "mongodb";

export async function updateVerificationInfomationAction(
  data: Record<string, string>,
  id: string
) {
  const verificationCollection = (await connectDB()).collection(
    "student-verification"
  );
  const _id = new ObjectId(id);

  //get the current information
  const informationToUpdate = await verificationCollection.findOne({ _id });

  if (!informationToUpdate) throw new Error("No _id found in the database");

  const tobeUpdated = diff(informationToUpdate, data);
  console.log(tobeUpdated);

  // const result = await verificationCollection.updateOne(
  //   { _id: new ObjectId(id) },
  //   update
  // );

  // if (result.acknowledged) {
  //   return {
  //     success: true,
  //     message: "Information Updated",
  //   };
  // } else {
  //   return {
  //     success: false,
  //     message: "Failed to update",
  //   };
  // }
}

export async function updateVerificationAction(formData: FormData) {
  const verificationCollection = (await connectDB()).collection(
    "student-verification"
  );
  const studentRecordCollection = (await connectDB()).collection(
    "student-record"
  );

  const id = new ObjectId(formData.get("_id") as string);

  const information = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    middleName: formData.get("middleName"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    guardian: formData.get("guardian"),
    strand: formData.get("strand"),
    sex: formData.get("sex"),
    gradeLevel: formData.get("gradeLevel"),
    email: formData.get("email"),
    birthdate: formData.get("birthdate"),
    age: formData.get("age"),
    fullName: `${formData.get("lastName")} ${formData.get(
      "firstName"
    )} ${formData.get("middleName")}`,
    assessment: [
      {
        year: formData.get("year"),
        tuition: formData.get("tuition"),
        strand: formData.get("strand"),
      },
    ],
  };

  const maxStudentID = await studentRecordCollection
    .find({})
    .sort({ studentId: -1 })
    .limit(1)
    .toArray();
  const newStudentId = (maxStudentID[0]?.studentId ?? 1) + 2;

  const attemptRecord = await studentRecordCollection.insertOne({
    ...information,
    studentId: newStudentId,
  });

  const deleteAttempt = await verificationCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (deleteAttempt.acknowledged) {
    return {
      success: true,
      message: "Successfully updated",
    };
  } else {
    return {
      success: false,
      message: "Failed to update",
    };
  }
}
