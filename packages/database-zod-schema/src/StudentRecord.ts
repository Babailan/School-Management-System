import { z } from "zod";
import { _id } from "../helper/_id";

const StudentRecordSchema = z.object({
  firstName: z.coerce.string(),
  lastName: z.coerce.string(),
  middleName: z.coerce.string(),
  address: z.coerce.string(),
  guardian: z.coerce.string(),
  date: z.coerce.string(),
  fullname: z.coerce.string(),
  strand: z.coerce.string(),
  gradeLevel: z.coerce.string(),
  sex: z.coerce.string(),
  age: z.coerce.number(),
  phoneNumber: z.coerce.string(),
  studentId: z.coerce.number(),
  _id: _id,
});

export { StudentRecordSchema };
