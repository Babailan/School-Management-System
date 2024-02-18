import { z } from "zod";
import { $Assessment } from "./$Assessment";
import { $Grade } from "./$Grade";

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
  students: z
    .array(
      $Assessment
        .omit({
          age: true,
          firstName: true,
          lastName: true,
          middleName: true,
        })
        .extend({
          grade: $Grade.partial(),
        })
    )
    .optional(),
});

export { $Section };
