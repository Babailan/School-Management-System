"use server";

import connectDB from "@/libs/helpers/connectDb";
import stringToRegexSearch from "@/libs/helpers/stringToRegexSearch";
import { Document, Filter, ObjectId } from "mongodb";

import { validate as validateV4 } from "uuid";

export async function GetVerificationSearchAction(
  query: string,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB())
    .db("yasc")
    .collection("student-verification");

  let filter: Filter<Document> = {};

  query = query.trim();

  if (validateV4(query)) {
    filter = {
      referenceNumber: query,
    };
  } else if (query.length > 0) {
    filter = {
      $text: {
        $search: query,
        $caseSensitive: false,
      },
    };
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

export async function GetVerificationByIdAction(id: string) {
  const collection = (await connectDB())
    .db("yasc")
    .collection("student-verification");

  const result = await collection.findOne({
    _id: new ObjectId(id),
  });

  return JSON.parse(JSON.stringify(result));
}
