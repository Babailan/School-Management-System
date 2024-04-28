"use server";

import { deepLowerCase } from "@/lib/helpers";
import { connectDB } from "@/lib/helpers/connectDb";
import _ from "lodash";

// add a new section in the database section collection return is like this { message : string, success : boolean }
export async function addSectionAction(data) {
  // connect to the database
  const sectionCollection = (await connectDB()).collection("section");
  data = deepLowerCase(data);

  if (
    await sectionCollection.findOne({
      section_name: data.section_name,
      year: data.year,
      semester: data.semester,
    })
  ) {
    return {
      message: "The semester has already been established this year.",
      success: false,
    };
  }

  // add the section to the database
  data.subjects = data.subjects.map((subject) =>
    _.merge(_.omit(subject, "_id"), { teacherId: null })
  );
  await sectionCollection.insertOne(data);

  return { message: "The section has been successfully added.", success: true };
}
