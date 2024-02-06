import { Connect } from "../../../mongodb/connect";

const headers = { "Access-Control-Allow-Origin": "*" };

export const POST = async (req: Request) => {
  try {
    const { page, query } = await req.json();
    const student_verificationCollection = (await Connect())
      .db("yasc")
      .collection("assessment");

    const latestDocuments = await student_verificationCollection
      .find({
        $or: [
          {
            referenceNumber: new RegExp(
              query
                .split(/\s+/)
                .map((word) => `(?=.*\\b${word}.*\\b)`)
                .join(""),
              "ig"
            ),
          },
          {
            fullname: new RegExp(
              query
                .split(/\s+/)
                .map((word) => `(?=.*\\b${word}.*\\b)`)
                .join(""),
              "ig"
            ),
          },
        ],
      })
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * 10)
      .limit(10)
      .toArray();

    return Response.json(latestDocuments, { headers });
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
