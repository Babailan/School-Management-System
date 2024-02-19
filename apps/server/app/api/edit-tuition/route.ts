import { Connect } from "../../../mongodb/connect";

const headers = { "Access-Control-Allow-Origin": "*" };

export const POST = async (req: Request) => {
  try {
    const { gradeLevel } = await req.json();
    const tuition_collection = (await Connect())
      .db("yasc")
      .collection("tuition");

    const result = await tuition_collection.findOne({
      gradeLevel: gradeLevel,
    });

    return Response.json({}, { headers });
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
