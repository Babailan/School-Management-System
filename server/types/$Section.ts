import { z } from "zod";

const $Section = z.object({
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
});

export { $Section };
