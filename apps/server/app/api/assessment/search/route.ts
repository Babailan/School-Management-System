import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, z } from "zod";
import {
  AssessmentSchema,
  StudentRecordSchema,
} from "@repo/database-zod-schema";

export const GET = async (req: NextRequest) => {
  const filter = z.object({
    query: z.string().default(""),
    page: z.number().default(1),
    limit: z.number().default(10),
  });

  try {
    const db = (await Connect()).db("yasc");
    const assessmentCollection =
      db.collection<typeof AssessmentSchema._type>("assessment");
    const studentRecordCollection =
      db.collection<typeof StudentRecordSchema._type>("student-record");

    const paramsObject = Object.fromEntries(req.nextUrl.searchParams);

    const params = filter.parse(paramsObject);

    const $FilterParams = z.object({
      year: z.string(),
    });

    const regexQuery = params.query
      .split(/\s+/)
      .map((word) => `(?=.*\\b${word}.*\\b)`)
      .join("");

    const studentRecordResult = await studentRecordCollection
      .find({
        fullname: new RegExp(regexQuery, "ig"),
      })
      .toArray();

    const results = await assessmentCollection
      .find({
        $or: studentRecordResult.map(({ studentId }) => ({
          studentId: studentId,
        })),
        $and: [$FilterParams.partial().parse(paramsObject)],
      })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .toArray();

    const totalCount = await assessmentCollection
      .find({
        $or: [{ fullname: new RegExp(regexQuery, "ig") }],
      })
      .count();

    const maxPage = Math.ceil(totalCount / params.limit) | 1;

    return Response.json({ results, currentPage: params.page, maxPage });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json(error.message, { status: 500 });
    }
    return Response.json(error, { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
