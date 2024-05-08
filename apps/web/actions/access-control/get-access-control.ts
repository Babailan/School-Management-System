"use server";

import { connectDB } from "@/lib/helpers";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import _ from "lodash";
import { Document, Filter, ObjectId } from "mongodb";

export async function getAccessControlSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("user-account");
  query = query.toLowerCase().trim();

  if (query) {
    filter = _.merge(filter, {
      fullName: stringToRegexSearch(query, true),
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

export async function getAccessControlById(id: string) {
  const collection = (await connectDB()).collection("user-account");

  const result = await collection.findOne({
    _id: new ObjectId(id),
  });

  return JSON.parse(JSON.stringify(result));
}
