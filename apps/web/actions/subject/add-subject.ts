"use server";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import Joi from "joi";

export default async function AddSubjectAction(data) {
  try {
    // Establish database connection
    data = deepLowerCase(data);
    const db = await connectDB();
    const subjectCollection = db.collection("subjects");

    // Check if subject code already exists
    const exist = await subjectCollection.findOne({
      subjectCode: data.subjectCode,
    });

    if (exist) {
      return {
        success: false,
        message: "Subject Code already exists",
      };
    }

    // Insert subject into the database
    const insertResult = await subjectCollection.insertOne(data);

    if (insertResult.acknowledged) {
      return {
        success: true,
        message: "Subject is added",
      };
    } else {
      return {
        success: false,
        message: "Failed to add subject",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
