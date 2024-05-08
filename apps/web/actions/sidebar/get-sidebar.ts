"use server";

import { connectDB } from "@/lib/helpers";

export async function getSidebarModals() {
  const db = await connectDB();
  const students = db.collection("students");
  
  const students_not_verified = await students.countDocuments({
    verified: false,
  });

  return {
    students_not_verified,
  };
}
