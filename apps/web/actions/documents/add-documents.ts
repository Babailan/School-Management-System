"use server";

import { connectDB } from "@/lib/helpers/connectDb";
import { revalidatePath } from "next/cache";

export async function addDocumentAction(document_name: string) {
  // add documents to database

  const collection = (await connectDB()).collection("documents");

  //check if document already exists
  document_name = document_name.trim().toLowerCase();
  const exist = await collection.findOne({ document_name });
  if (exist) {
    return {
      success: false,
      message: "The document you are trying to create already exists.",
    };
  }

  await collection.insertOne({
    document_name,
  });

  revalidatePath("/","layout")

  return { success: true, message: "Document added successfully" };
}
