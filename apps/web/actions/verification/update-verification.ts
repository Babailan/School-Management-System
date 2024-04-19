"use server";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import _ from "lodash";
import { ObjectId } from "mongodb";

export async function updateVerificationInfomationAction(
  data: Record<string, any>,
  id: string
) {
  const verificationCollection = (await connectDB()).collection("students");
  const _id = new ObjectId(id);

  //get the current information
  const informationToUpdate = await verificationCollection.findOne({ _id });

  if (!informationToUpdate) throw new Error("No _id found in the database");

  // update lastname
  data.fullName = `${data.lastName} ${data.firstName} ${data.middleName}`;
  data = _.omit(data, ["_id"]);

  const result = await verificationCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: deepLowerCase(data),
    }
  );

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

export async function updateVerifiedStudent(form, _id) {
  const db = await connectDB();
  const studentsCollection = db.collection<{
    verified: boolean;
    assessment: any[];
  }>("students");
  const sectionCollection = db.collection("section");

  await studentsCollection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set:{
        verified:true,
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

  await sectionCollection.updateOne(
    { _id: new ObjectId(form.section._id) },
    {
      $push: {
        students: _id
      }
    }
  );
}
