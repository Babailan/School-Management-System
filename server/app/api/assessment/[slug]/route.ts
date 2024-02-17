import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, z } from "zod";
import { ObjectId } from "mongodb";
import { $_id } from "../../../../types/$_id";
import { $StudentVerification } from "../../../../types/$StudentVerification";
import { $Assessment, $Pagination } from "../../../../types";

export const GET = async (req: NextRequest, { params }) => {
  try {
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection("assessment");
    const { slug } = params;
    if (slug == "search") {
      const paramsObject = Object.fromEntries(req.nextUrl.searchParams);

      const params = $Pagination.parse(paramsObject);

      const $FilterParams = z.object({
        year: z.string(),
      });
      const regexQuery = params.query
        .split(/\s+/)
        .map((word) => `(?=.*\\b${word}.*\\b)`)
        .join("");

      let filterOR = [
        {
          referenceNumber: new RegExp(regexQuery, "ig"),
        },
        {
          fullname: new RegExp(regexQuery, "ig"),
        },
      ];

      const results = await assessmentCollection
        .find({
          $or: filterOR,
          $and: [$FilterParams.partial().parse(paramsObject)],
        })
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .toArray();

      const totalCount = await assessmentCollection
        .find({
          $or: filterOR,
        })
        .count();

      const maxPage = Math.ceil(totalCount / params.limit) | 1;

      return Response.json({ results, currentPage: params.page, maxPage });
    } else {
      const result = await assessmentCollection.findOne({
        _id: new ObjectId($_id.parse(slug)),
      });

      const parsedResult = $Assessment.partial().nullable().parse(result);
      return Response.json(parsedResult);
    }
  } catch (error) {
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
