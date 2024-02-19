import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, z } from "zod";
import { $_id } from "@repo/types";
import { $StudentVerification } from "@repo/types";
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest, { params }) => {
  try {
    const studentVerificationCollection = (await Connect())
      .db("yasc")
      .collection("student-verification");
    const { slug } = params;
    if (slug == "search") {
      const { query, page, limit, year } = Object.fromEntries(
        req.nextUrl.searchParams
      );
      const $SearchParams = z.object({
        query: z.string().default(""),
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
        year: z.coerce.string().optional(),
      });

      const params = $SearchParams.parse({ query, page, limit, year });

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

      if (params.year) {
        filterOR = filterOR.map((v) => {
          return { ...v, year: params.year };
        });
      }

      const results = await studentVerificationCollection
        .find({
          $or: filterOR,
        })
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .toArray();

      const totalCount = await studentVerificationCollection
        .find({
          $or: filterOR,
        })
        .count();

      const maxPage = Math.ceil(totalCount / params.limit) | 1;

      return Response.json({ results, currentPage: params.page, maxPage });
    } else {
      const result = await studentVerificationCollection.findOne({
        _id: new ObjectId($_id.parse(slug)),
      });

      const parsedResult = $StudentVerification.nullable().parse(result);
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
