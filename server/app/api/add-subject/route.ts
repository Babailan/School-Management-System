import { Connect } from "../../../mongodb/connect";

const headers = { "Access-Control-Allow-Origin": "*" };

export const POST = async (req: Request) => {
  try {
    const { subjectName, subjectCode } = await req.json();
    const subjects_collection = (await Connect())
      .db("yasc")
      .collection("subjects");

    // Check if subjectCode already exists (case-insensitive)
    const existingSubject = await subjects_collection.findOne({
      subjectCode: { $regex: new RegExp(`^${subjectCode}$`, "i") },
    });

    if (existingSubject) {
      // If subjectCode already exists, return an appropriate response
      return Response.json(
        {
          success: false,
          message: "SubjectCode already exists",
          data: {},
        },
        { headers }
      );
    } else {
      // If subjectCode doesn't exist, add it to the collection
      await subjects_collection.insertOne({
        subjectName,
        subjectCode,
        status: "active",
        date: new Date(),
      });

      return Response.json(
        {
          success: true,
          message: "Subject added successfully",
          data: {},
        },
        { headers }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        data: {},
      },
      { headers }
    );
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
