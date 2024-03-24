import june from "moment-timezone";

// calculate age from date of birth the format of string is "yyyy-mm-dd"
export const calculateAge = (birthDate: string) => {
  const now = june.tz("Asia/Manila");
  const birth = june(birthDate);
  return now.diff(birth, "year");
};
