"use server";

import connectDB from "@/libs/helpers/connectDb";
import Joi from "joi";

export async function addTuitionAction(formData: FormData) {
  const tuitionCollection = (await connectDB())
    .db("yasc")
    .collection("tuition");

  const schema = Joi.object({
    tuition_title: Joi.string().messages({
      "string.empty": "Tuition Title is required",
    }),
    amount: Joi.string().messages({
      "string.empty": "Amount is required",
    }),
  });

  const { error, value } = schema.validate({
    tuition_title: formData.get("tuition_title"),
    amount: formData.get("amount"),
  });

  if (error) {
    return {
      success: false,
      message: error.details[0].message,
    };
  }

  const isExist = await tuitionCollection.findOne({
    tuition_title: value.tuition_title,
  });
  if (isExist) {
    return {
      success: false,
      message: "Tuition title already exist",
    };
  }

  const result = await tuitionCollection.insertOne(value);

  if (result.acknowledged) {
    return {
      success: true,
      message: "Successfully added",
    };
  } else {
    return {
      success: false,
      message: "Failed to add",
    };
  }
}
