"use server";

import connectDB from "@/lib/helpers/connectDb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateDocumentAction(id, data) {
  revalidatePath("/","layout")
    
  data = JSON.parse(data);

  const collection = (await connectDB()).collection("documents");

  const document = await collection.findOne({ _id: new ObjectId(id) });
  if (!document) {
    return {
      success: false,
      message: "Document not found",
    };
  }
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: data,
    }
  );


  return {
    success: true,
    message: "Document updated successfully",
  };
}
