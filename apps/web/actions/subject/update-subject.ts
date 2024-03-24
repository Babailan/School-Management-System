"use server";

import connectDB from "@/lib/helpers/connectDb";
import { ObjectId } from "mongodb";

/**
 * Updates a subject by its ID.
 * @param {string} id - The ID of the subject to update.
 * @param {object} payload - The updated subject data.
 * @returns {Promise<object>} - A promise that resolves to an object containing the success status and message.
 * @throws {Error} - If the subject with the given ID does not exist.
 */
export async function updateSubjectById(id, payload) {
  const collection = (await connectDB()).collection("subjects");
  const convertToObjectId = new ObjectId(id);

  const exist = await collection.findOne({ _id: convertToObjectId });

  if (!exist) {
    throw new Error("Subject not found");
  }
  const existSubjectCode = await collection.findOne({
    $and: [
      { subjectCode: payload.subjectCode },
      { _id: { $ne: convertToObjectId } },
    ],
  });
  if (existSubjectCode) {
    return {
      success: false,
      message: "Subject code already exist",
    };
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: payload,
    }
  );

  return {
    success: true,
    message: "Subject updated successfully",
  };
}
