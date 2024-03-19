"use server";

import connectDB from "@/lib/helpers/connectDb";
import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";

export async function getTuitionSearchAction(
  page = 1,
  limit = 10,
  search = ""
) {
  const tuitionCollection = (await connectDB())
    .db("yasc")
    .collection("tuition");

  stringToRegexSearch(search.trim().toLowerCase());

  return await tuitionCollection.find({}).toArray();
}
