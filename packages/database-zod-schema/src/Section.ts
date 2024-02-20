import { z } from "zod";
import { AssessmentSchema } from "./Assessment";
import { _id } from "../helper/_id";

const SectionSchema = z.object({
  subjects: z.array(
    z.object({
      _id: z.string(),
      subjectCode: z.string(),
      subjectName: z.string(),
      status: z.string(),
      date: z.string(),
    })
  ),
  gradeLevel: z.string(),
  year: z.string(),
  sectionName: z.string(),
  strand: z.string(),
  semester: z.string(),
  students: z.array(AssessmentSchema).default([]),
  _id: _id,
});

export { SectionSchema };
