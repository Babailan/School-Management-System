"use server";
import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import { Document, Filter, ObjectId } from "mongodb";

/**
 * Retrieves subjects based on search query and pagination.
 * @param page - The page number to retrieve.
 * @param query - The search query to filter subjects by subject name.
 * @param limit - The maximum number of subjects to retrieve per page.
 * @returns A JSON object containing the retrieved subjects, maximum page count, and current page number.
 */
export async function getSubjectSearchAction(
  page: number,
  query: string,
  limit: number
) {
  const subjectCollection = (await connectDB()).collection("subjects");

  const documentCounted = await subjectCollection.countDocuments();

  let filter: Filter<Document> = {};
  if (query) {
    filter = {
      subjectName: {
        $regex: stringToRegexSearch(query),
        $options: "i",
      },
    };
  }

  const result = await subjectCollection
    .find(filter)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .toArray();

  return JSON.parse(
    JSON.stringify({
      results: result,
      maxPage: Math.ceil(documentCounted / Number(limit)),
      currentPage: page,
    })
  );
}

/**
 * Retrieves a subject by its ID.
 * @param id - The ID of the subject to retrieve.
 * @returns A Promise that resolves to the subject object.
 */
export async function getSubjectByIdAction(id: string) {
  const subjectCollection = (await connectDB()).collection("subjects");

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const result = await subjectCollection.findOne({ _id: new ObjectId(id) });
  if (!result) {
    throw new Error("Subject not found");
  }

  return JSON.parse(JSON.stringify(result));
}
