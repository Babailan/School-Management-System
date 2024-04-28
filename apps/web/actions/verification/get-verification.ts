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
  await wait(3000)
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("students");
  query = query.toLowerCase().trim();

  if (query) {
    filter = _.merge(filter, { fullName: stringToRegexSearch(query, true) });
    // Assuming verification_name is the field to search for in the verification collection
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

  const result = await collection.findOne(
    _.merge(
      {
        _id: new ObjectId(id),
      },
      filter
    )
  );

  return JSON.parse(JSON.stringify(result));
}
