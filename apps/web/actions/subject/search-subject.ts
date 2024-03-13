"use server";
import connectDB from "@/libs/helpers/connectDb";
import stringToRegexSearch from "@/libs/helpers/stringToRegexSearch";
import { Document, Filter } from "mongodb";

export default async function SearchSubjectActions(
  page: number,
  query: string,
  limit: number
) {
  const subjectCollection = (await connectDB())
    .db("yasc")
    .collection("subjects");
  console.log(query);

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
