import { Connect } from "../../../mongodb/connect";

export const POST = async (req: Request) => {
  try {
    const { page, query } = await req.json();
    const student_verificationCollection = (await Connect())
      .db("yasc")
      .collection("subjects");

    const documentCounted =
      await student_verificationCollection.countDocuments();
    const maxPage = Math.ceil(documentCounted / 10);

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
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * 10)
      .limit(10)
      .toArray();

    return Response.json({
      success: true,
      message: "Successful",
      data: { documents: latestDocuments, maxPage },
    });
  } catch (error) {
    return Response.json({}, { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
