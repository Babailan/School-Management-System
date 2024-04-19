"use server";

import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import _ from "lodash";
import type { Filter, Document } from "mongodb";

export async function getDocumentsSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("documents");
  query = query.toLowerCase().trim();

  if (query) {
    filter = _.merge(filter, { document_name: stringToRegexSearch(query, true) });
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
