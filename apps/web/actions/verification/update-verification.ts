"use server";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateVerificationInfomationAction(
  data: Record<string, any>,
  id: string
) {
  data = _.omit(data, ["_id"]);
  const verificationCollection = (await connectDB()).collection("students");

  //get the current information
  const info = await verificationCollection.findOne({ _id: new ObjectId(id) });

  if (!info) throw new Error("No _id found in the database");

  if (
    _.intersectionWith(
      Object.keys(data),
      ["firstName", "lastName", "middleName"],
      _.isEqual
    ).length > 0
  ) {
    _.merge(info, data);
    data.fullName = `${info.lastName} ${info.firstName} ${info.middleName}`;
  }

  const result = await verificationCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: deepLowerCase(data),
    }
  );

  revalidatePath("/", "layout");

  if (result.acknowledged) {
    return {
      success: true,
      message: "Student Information updated",
    };
  } else {
    return {
      success: false,
      message: "Failed to update",
    };
  }
}

// update the student into verified student
export async function updateVerifiedStudent(form, _id) {
  const db = await connectDB();
  const studentsCollection = db.collection<{
    verified: boolean;
    assessment: any[];
  }>("students");
  const sectionCollection = db.collection("section");


  // add to the students collection
  await studentsCollection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        verified: true,
      },
      $push: {
        assessment: {
          issued_date: new Date(),
          title: "Tuition Fee",
          year: new Date().getFullYear().toString(),
          amount: form.tuition,
        },
      },
    }
  );

  //add to the section
  await sectionCollection.updateOne(
    { _id: new ObjectId(form.section._id) },
    {
      $push: {
        students: _id,
      },
    }
  );

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Successfully verified",
  };
}
