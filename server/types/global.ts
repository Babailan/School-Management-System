import { ObjectId } from "mongodb";
import { z } from "zod";

const $_id = z.string();

const $StudentRecord = z.object({
  firstName: z.coerce.string(),
  lastName: z.coerce.string(),
  middleName: z.coerce.string(),
  address: z.coerce.string(),
  guardian: z.coerce.string(),
  date: z.coerce.string(),
  fullname: z.coerce.string(),
  strand: z.coerce.string(),
  gradeLevel: z.coerce.string(),
  referenceNumber: z.coerce.string(),
  sex: z.coerce.string(),
  age: z.coerce.number(),
  phoneNumber: z.coerce.string(),
  studentId: z.coerce.number(),
});

const $StudentVerification = z.object({
  firstName: z.coerce.string(),
  lastName: z.coerce.string(),
  middleName: z.coerce.string(),
  address: z.coerce.string(),
  guardian: z.coerce.string(),
  date: z.coerce.string(),
  fullname: z.coerce.string(),
  strand: z.coerce.string(),
  gradeLevel: z.coerce.string(),
  referenceNumber: z.coerce.string(),
  sex: z.coerce.string(),
  age: z.coerce.number(),
  phoneNumber: z.coerce.string(),
  year: z.coerce.string(),
});
const $Pagination = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

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

export { $StudentRecord, $StudentVerification, $_id, $Pagination, $Section };
