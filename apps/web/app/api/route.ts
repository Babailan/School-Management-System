import { connectDB } from "@/lib/helpers/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const test = await connectDB();
  return NextResponse.json({ message: "Connected to the database" });
};
