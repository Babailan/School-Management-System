"use server";
import connectDB from "@/libs/helpers/connectDb";
import Joi from "joi";

export async function AddCurriculumAction(formData: FormData) {
  const db = (await connectDB()).db("yasc");
  const curriculum = db.collection("curriculum");

  const requestValidation = Joi.object({
    year: Joi.string().messages({
      "string.empty": "Year is required",
    }),
    gradeLevel: Joi.string().messages({
      "string.empty": "Grade Level is required",
    }),
    semester: Joi.string().messages({
      "string.empty": "Semester is required",
    }),
  });

  const { error, value } = requestValidation.validate({
    year: formData.get("year"),
    gradeLevel: formData.get("gradeLevel"),
    semester: formData.get("semester"),
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  try {
    const existingCurriculum = await curriculum.findOne({
      year: value.year,
      gradeLevel: value.gradeLevel,
      semester: value.semester,
    });

    if (existingCurriculum) {
      return {
        success: false,
        message: "Curriculum already exists",
      };
    }

    // Insert the validated data into the 'curriculum' collection
    await curriculum.insertOne(value);

    return {
      success: true,
      message: "Curriculum Added",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to add curriculum data",
    };
  }
}
