"use server";

import { connectDB } from "@/lib/helpers/connectDb";


export async function getDashboardActions() {

  const db = await connectDB();

  const notVerified = await db
    .collection("students")
    .countDocuments({ verified: false });

  return { notVerified };
}
