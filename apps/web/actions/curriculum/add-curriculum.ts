"use server";
import connectDB from "@/lib/helpers/connectDb";

export async function AddCurriculumAction(data) {
  const collection = (await connectDB()).db("yasc").collection("curriculum");

  try {
    const existingCurriculum = await collection.findOne({
      year: data.year,
      gradeLevel: data.gradeLevel,
      semester: data.semester,
    });

    if (existingCurriculum) {
      return {
        success: false,
        message: "Curriculum already exists",
      };
    }

    // Insert the validated data into the 'curriculum' collection
    await collection.insertOne(data);

    return {
      success: true,
      message: "Curriculum Added",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to add curriculum data",
    };
  }
}
