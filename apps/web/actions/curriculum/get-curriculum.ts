"use server";
import connectDB from "@/lib/helpers/connectDb";
import { ObjectId } from "mongodb";

interface GetCurriculumByFilterParams {
  [key: string]: any;
}
export async function GetCurriculumByFilter(
  filter: GetCurriculumByFilterParams
) {
  const subjects_collection = (await connectDB()).collection("curriculum");

  // Find the curriculum based on year and gradeLevel
  const results = await subjects_collection
    .find({
      ...filter,
    })
    .toArray();

  return JSON.parse(JSON.stringify(results));
}

export async function GetCurriculumByIdAction(id: string) {
  if (ObjectId.isValid(id) === false) throw new Error("Invalid ID");

  const subjects_collection = (await connectDB()).collection("curriculum");

  // Find the curriculum based on year and gradeLevel
  const results = await subjects_collection.findOne({
    _id: new ObjectId(id),
  });

  return JSON.parse(JSON.stringify(results));
}
