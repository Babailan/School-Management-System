import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, z } from "zod";
import { $_id } from "@repo/types";
import { $Section } from "@repo/types";
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest, { params }) => {
  try {
    const { id } = params;
    const parsedID = $_id.parse(id);
    const section = (await Connect()).db("yasc").collection("section");

    const result = await section.findOne({
      _id: new ObjectId(parsedID),
    });

    const safeParseResult = $Section.nullable().parse(result);

    return Response.json(safeParseResult);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 409 });
    }
    if (error instanceof Error) {
      return Response.json(error.message, { status: 500 });
    }
    return Response.json("Internal Server Error", { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
