"use server";
import connectDB from "@/libs/helpers/connectDb";
import { Filter, Document } from "mongodb";

export async function getAssessmentSearchAction(
  query: string,
  page: number,
  limit: number,
  year: string
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB())
    .db("yasc")
    .collection("student-record");

  let filter: Filter<Document> = {
    assessment: {
      $elemMatch: {
        year: "2024",
      },
    },
  };
  if (query.length > 0) {
    filter.$text = {
      $search: query,
      $caseSensitive: false,
    };
  }

  //format the return value
  const filterCursor = collection.find(filter);
  const totalCount = await filterCursor.count();
  const totalPages = Math.ceil(totalCount / limit);

  const result = await filterCursor
    .skip(skip)
    .limit(limit)
    .map((doc) => {
      doc.assessment = doc.assessment.find((assess) => assess.year === year);
      return doc;
    })
    .toArray();

  return JSON.parse(
    JSON.stringify({
      results: result,
      totalPages,
    })
  );
}
