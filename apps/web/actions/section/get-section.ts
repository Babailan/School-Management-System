"use server";
import connectDB from "@/lib/helpers/connectDb";
import { ObjectId } from "mongodb";

/**
 * Retrieves a section from the database based on the provided filter.
 * @param {Object} filter - The filter to apply when querying the database.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of section objects that match the filter.
 */
export async function GetSectionByFilterAction(filter) {
  const collection = (await connectDB()).db("yasc").collection("section");

  if (filter._id) {
    filter._id = new ObjectId(filter.id || filter._id);
    delete filter.id;
  }

  // Find the curriculum based on year and gradeLevel
  const results = await collection.find({ ...filter }).toArray();

  return JSON.parse(JSON.stringify(results));
}

/**
 * Retrieves a section by its ID.
 * @param id - The ID of the section to retrieve.
 * @returns A Promise that resolves to the retrieved section.
 */
export async function GetSectionByIdAction(id: string) {
  const collection = (await connectDB()).db("yasc").collection("section");
  const useraccount = (await connectDB()).db("yasc").collection("useraccount");

  const results = await collection.findOne({
    _id: new ObjectId(id),
  });
  if (!results) return null;

  const subjectIds = results.subjects
    .filter((subjects) => subjects.subject_teacher_id)
    .map((subjects) => new ObjectId(subjects.subject_teacher_id));
  const teachers = await useraccount
    .find({ _id: { $in: subjectIds } })
    .toArray();

  return JSON.parse(JSON.stringify(results));
}
