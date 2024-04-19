"use server";
import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import _ from "lodash";
import { Document, Filter, ObjectId } from "mongodb";

/**
 * Retrieves a section from the database based on the provided filter.
 * @param {Object} filter - The filter to apply when querying the database.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of section objects that match the filter.
 */
export async function getSectionByFilter(filter) {
  const collection = (await connectDB()).collection("section");

  // Find the curriculum based on year and gradeLevel
  const results = await collection.find(filter).toArray();
  console.log(results);
  return JSON.parse(JSON.stringify(results));
}

/**
 * Retrieves a section by its ID.
 * @param id - The ID of the section to retrieve.
 * @returns A Promise that resolves to the retrieved section.
 */
export async function GetSectionByIdAction(id: string) {
  const collection = (await connectDB()).collection("section");
  const useraccount = (await connectDB()).collection("useraccount");

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

export async function getSectionSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("section");
  query = query.toLowerCase().trim();

  if (query || Object.keys(filter).length) {
    filter = _.merge(
      filter,
      query ? { section_name: stringToRegexSearch(query, true) } : {}
    );
  }

  const filterCursor = collection.find(filter);
  const totalCount = await filterCursor.count();
  const totalPages = Math.ceil(totalCount / limit);

  const result = await filterCursor.skip(skip).limit(limit).toArray();

  return JSON.parse(
    JSON.stringify({
      results: result,
      totalPages,
    })
  );
}
