"use server";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import { detailedDiff, diff, updatedDiff } from "deep-object-diff";
import _, { update } from "lodash";
import { ObjectId } from "mongodb";

export async function updateVerificationInfomationAction(
  data: Record<string, string>,
  id: string
) {
  const verificationCollection = (await connectDB()).collection("students");
  const _id = new ObjectId(id);

  //get the current information
  const informationToUpdate = await verificationCollection.findOne({ _id });

  if (!informationToUpdate) throw new Error("No _id found in the database");

  let tobeUpdated = diff(informationToUpdate, data);

  tobeUpdated = _.omit(tobeUpdated, ["_id"]);

  console.log(deepLowerCase(tobeUpdated));
  const result = await verificationCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: deepLowerCase(tobeUpdated),
    }
  );

  if (result.acknowledged) {
    return {
      success: true,
      message: "Information Updated",
    };
  } else {
    return {
      success: false,
      message: "Failed to update",
    };
  }
}

export async function updateVerificationToVerifiedAction(
  data: Record<string, string>,
  id: string
) {
  const verificationCollection = (await connectDB()).collection("students");
  const _id = new ObjectId(id);
  const updated = await updateVerificationInfomationAction(data, id);
  if (updated.success) {
    console.log(updated);
  }
}
