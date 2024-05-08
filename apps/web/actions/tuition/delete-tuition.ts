"use server";

import CheckPin from "@/app/components/pin";
import { connectDB } from "@/lib/helpers";
import { wait } from "@/lib/helpers/wait";
import { getValidatePIN } from "../account/get-account";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export async function deleteTuitionActionById(pin: string, _id: string) {
  const pinResult = await getValidatePIN(pin);
  if (!pinResult.success) {
    return pinResult;
  }

  const collection = (await connectDB()).collection("tuition");
  const result = await collection.deleteOne({ _id: new ObjectId(_id) });
  revalidatePath("/", "layout");
  return {
    success: true,
    message: "The Document is deleted successfully",
  };
}