import { Connect } from "../../../mongodb/connect";

// Create Curriculum
export const POST = async (req: Request) => {
  try {
    const { year, gradeLevel } = await req.json();

    console.log(year, gradeLevel);
    if (!year || !gradeLevel) {
      return new Response("Missing required fields", { status: 400 });
    }

    const subjects_collection = (await Connect())
      .db("yasc")
      .collection("curriculum");

    // Check if subjectCode already exists (case-insensitive)
    const existingSubject = await subjects_collection.findOne({
      year: year,
      gradeLevel: gradeLevel,
    });
    if (existingSubject) {
      return new Response("Existing Curriculum", { status: 409 });
    }

    const insert = await subjects_collection.insertOne({
      status: "active",
      year,
      gradeLevel,
    });
    if (insert.acknowledged) {
      return Response.json("Curriculum Added");
    }
  } catch (error) {
    return Response.error();
  }
};

export const GET = async (req: Request) => {
  try {
    const subjects_collection = (await Connect())
      .db("yasc")
      .collection("curriculum");

    // Find the curriculum based on year and gradeLevel
    const curriculum = await subjects_collection.find({}).toArray();

    return Response.json(curriculum, {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
