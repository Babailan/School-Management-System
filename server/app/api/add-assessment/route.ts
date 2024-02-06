import { Connect } from "../../../mongodb/connect";

const headers = { "Access-Control-Allow-Origin": "*" };

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const assessment = (await Connect()).db("yasc").collection("assessment");
    const studentCollection = (await Connect())
      .db("yasc")
      .collection("student-record");
    body["referenceNumber"];

    console.log(body);
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
