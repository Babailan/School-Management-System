"use server";

import connectDB from "@/mongodb/connect";
import { v4 as uuidv4 } from "uuid";

// new student record

export async function newRecord(data) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const db = (await connectDB()).collection("students");
  data.referenceNumber = uuidv4();
  data.verified = false;
  data.fullName = `${data.lastName}, ${data.firstName} ${data.middleName}`;
  db.insertOne(data);
}
