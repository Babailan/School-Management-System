"use server";
import { deepLowerCase } from "@/lib/helpers";
import connectDB from "@/lib/helpers/connectDb";
import Joi from "joi";

export default async function AddSubjectAction(formData: FormData) {
  try {
    // Establish database connection
    const db = await connectDB();
    const subjectCollection = db.db("yasc").collection("subjects");

    // Validate form data
    let { error, value } = Joi.object({
      subjectCode: Joi.string().required().messages({
        "string.empty": "Subject Code is required",
      }),
      subjectName: Joi.string().required().messages({
        "string.empty": "Subject Name is required",
      }),
    }).validate({
      subjectCode: formData.get("subjectCode"),
      subjectName: formData.get("subjectName"),
    });
    value = deepLowerCase(value);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Check if subject code already exists
    const exist = await subjectCollection.findOne({
      subjectCode: value.subjectCode,
    });

    if (exist) {
      return {
        success: false,
        message: "Subject Code already exists",
      };
    }

    // Insert subject into the database
    const insertResult = await subjectCollection.insertOne({
      subjectCode: value.subjectCode,
      subjectName: value.subjectName,
      active_status: true,
      date: new Date(),
    });

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
