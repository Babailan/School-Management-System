"use server";

import connectDB from "@/lib/helpers/connectDb";

// get information for dashboard such as how many verification are there

export async function getDashboardActions() {
  // get total applicants

  const db = await connectDB();

  const notVerified = await db
    .collection("students")
    .countDocuments({ verified: false });

  return { notVerified };
}
