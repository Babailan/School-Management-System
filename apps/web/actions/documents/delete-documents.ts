"use server";

import { connectDB } from "@/lib/helpers";
import { wait } from "@/lib/helpers/wait";

export async function deleteDocumentAction(pin: string, _id) {
    await wait(2000);
    (await connectDB()).collection("documents")
}
