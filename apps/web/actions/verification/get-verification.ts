"use server";

import { connectDB } from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import { wait } from "@/lib/helpers/wait";
import _ from "lodash";
import { Document, Filter, ObjectId } from "mongodb";

export async function getVerificationSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("students");
  query = query.toLowerCase().trim();

  if (query) {
    filter = _.merge(filter, {
      $or: [
        { fullName: stringToRegexSearch(query, true) },
        { referenceNumber: stringToRegexSearch(query, true) },
      ],
    });
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

export async function GetVerificationByIdAction(
  id: string,
  filter: Filter<Document> = {}
) {
  const collection = (await connectDB()).collection("students");

  const result = await collection.findOne({
    _id: new ObjectId(id),
  });

  return JSON.parse(JSON.stringify(result));
}
