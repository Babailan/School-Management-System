"use server";

import connectDB from "@/lib/helpers/connectDb";
import Joi from "joi";
import { ObjectId } from "mongodb";

// add a new section in the database section collection return is like this { message : string, success : boolean }
export async function addSectionAction(formData: FormData) {
  // connect to the database
  const sectionCollection = (await connectDB())
    .db("yasc")
    .collection("section");

  //validate formData , subjects field is non strict but only projects the subjects field
  const { error, value } = Joi.object({
    curriculumID: Joi.string()
      .required()
      .error(new Error("Select a curriculum")),
    strand: Joi.string().required().error(new Error("Select a strand")),
    sectionName: Joi.string()
      .required()
      .error(new Error("Section name is required")),
  }).validate({
    sectionName: formData.get("sectionName"),
    curriculumID: formData.get("curriculumID"),
    strand: formData.get("strand"),
  });

  if (error) {
    return { message: error.message, success: false };
  }
  if (await sectionCollection.findOne({ sectionName: value.sectionName })) {
    return { message: "Section already exist", success: false };
  }
  const curriculum = await (
    await connectDB()
  )
    .db("yasc")
    .collection("curriculum")
    .findOne({ _id: new ObjectId(value.curriculumID) });

  const subjects =
    curriculum?.[value.strand]?.map((subject) => {
      return {
        subjectName: subject.subjectName,
        subjectCode: subject.subjectCode,
        subject_teacher_id: null,
      };
    }) ?? [];

  await sectionCollection.insertOne({
    sectionName: value.sectionName,
    strand: value.strand,
    subjects: subjects,
    adviser: null,
    year: curriculum?.year,
    semester: curriculum?.semester,
    gradeLevel: curriculum?.gradeLevel,
  });

  return { message: "Section added", success: true };
}
