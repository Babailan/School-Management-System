"use server";

import { connectDB } from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import _ from "lodash";
import { Document, Filter, ObjectId } from "mongodb";

export async function getStudentFeeSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("students");
  query = query.toLowerCase().trim();

  _.merge(filter, { verified: true });

  if (query) {
    filter = _.merge(filter, { fullName: stringToRegexSearch(query, true) });
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

export async function getStudentFeeById(_id: string) {
  const collection = (await connectDB()).collection("students");

    const student = await collection.findOne({ _id: new ObjectId(_id), verified: true });

    if (!student) {
      throw new Error("Student not found");
    }

    return JSON.parse(JSON.stringify(student));
}
