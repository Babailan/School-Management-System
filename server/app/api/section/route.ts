import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ZodError, z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    const subjectSchema = z.object({
      _id: z.string(),
      subjectCode: z.string().min(1, { message: "Subject Code is required" }),
      subjectName: z.string().min(1, { message: "Subject Name is required" }),
      status: z.string(),
      date: z.string(),
    });

    const schema = z.object({
      subjects: z.array(subjectSchema).optional(),
      gradeLevel: z.string().min(1, { message: "Grade level is required" }),
      year: z.string().min(1, { message: "Year is required" }),
      sectionName: z.string().min(1, { message: "Section name is required" }),
      strand: z.string().min(1, { message: "Strand is required" }),
      semester: z.string().min(1, { message: "Semester is required" }),
    });

    const sectionCollection = (await Connect())
      .db("yasc")
      .collection("section");
    const parseData = schema.parse(data);

    const existingSection = await sectionCollection.findOne({
      year: parseData.year,
      sectionName: parseData.sectionName,
    });

    if (existingSection) {
      throw new ZodError([
        {
          code: "custom",
          path: [],
          message: "Section already exists for this year.",
        },
      ]);
    }

    await sectionCollection.insertOne(parseData);

    return Response.json({ message: "Section successfully added." });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 403 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const section = (await Connect()).db("yasc").collection("section");
    const searchParams = req.nextUrl.searchParams;
    const { page, limit } = Object.fromEntries(searchParams.entries());

    const $SearchParams = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(10),
    });
    const parsedParams = $SearchParams.parse({ page, limit });

    const results = await section
      .find({})
      .skip((parsedParams.page - 1) * parsedParams.limit)
      .limit(parsedParams.limit)
      .toArray();

    const totalDocuments = await section.countDocuments({});
    const maxPage = Math.ceil(totalDocuments / parsedParams.limit);

    return Response.json({ results, currentPage: parsedParams.page, maxPage });
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
