import { z } from "zod";

/*
  ^: Asserts the start of the string.
  [0-9a-fA-F]: Matches any hexadecimal digit (0-9, a-f, A-F).
  {24}: Specifies that there should be exactly 24 of the preceding characters.
  $: Asserts the end of the string.
*/
const _id = z
  .string()
  .refine((id) => /^[0-9a-fA-F]{24}$/.test(id), { message: "Not a valid ID" });

export { _id };
