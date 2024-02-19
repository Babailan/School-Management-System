import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError } from "zod";

export const GET = async (req: NextRequest, test) => {
  try {
    const {
      page,
      limit, // Default limit set to 10, change it as needed
      query,
    } = Object.fromEntries(req.nextUrl.searchParams);

    const student_verificationCollection = (await Connect())
      .db("yasc")
      .collection("subjects");

    const documentCounted =
      await student_verificationCollection.countDocuments();

    const latestDocuments = await student_verificationCollection
      .find({
        $or: [
          {
            subjectCode: new RegExp(
              query
                .split(/\s+/)
                .map((word) => `(?=.*\\b${word}.*\\b)`)
                .join(""),
              "ig"
            ),
          },
          {
            subjectName: new RegExp(
              query
                .split(/\s+/)
                .map((word) => `(?=.*\\b${word}.*\\b)`)
                .join(""),
              "ig"
            ),
          },
        ],
      })
      .skip((parseInt(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray();

    return Response.json({
      results: latestDocuments,
      maxPage: Math.ceil(documentCounted / Number(limit)),
      currentPage: parseInt(page),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 409 });
    }
    if (error instanceof Error) {
      return Response.json(error.message, { status: 500 });
    }
    return Response.json({}, { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
