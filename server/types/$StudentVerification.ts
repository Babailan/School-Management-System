import { z } from "zod";

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

export { $StudentVerification };
