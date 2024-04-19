"use server";

import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import _ from "lodash";
import { Filter,Document } from "mongodb";

export async function getAllTuitionFee() {
  const tuitionCollection = (await connectDB()).collection("tuition");

  return JSON.parse(JSON.stringify(await tuitionCollection.find({}).toArray()));
}


export async function getTuitionSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("tuition");
  query = query.toLowerCase().trim();

  if (query || Object.keys(filter).length) {
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

