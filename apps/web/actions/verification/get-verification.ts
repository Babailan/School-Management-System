"use server";

import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import { Document, Filter, ObjectId } from "mongodb";

export async function GetVerificationSearchAction(
  query: string,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB())
    .db("yasc")
    .collection("student-verification");
  query.toLowerCase();
  query = query.trim();

  let filter: Filter<Document> = {
    $or: [
      {
        fullName: {
          $regex: stringToRegexSearch(query),
        },
      },
      { referenceNumber: { $regex: stringToRegexSearch(query) } },
    ],
  };

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
