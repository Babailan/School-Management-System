// Generate a student verification collection and append it to array

const { faker } = require("@faker-js/faker");
const { randomUUID } = require("crypto");
const fs = require("fs");
const students = [];
function addStudent() {
  // student details
  const guardian = faker.person.fullName();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const middleName = faker.person.middleName();
  const fullName = `${lastName} ${firstName} ${middleName}`;
  const sex = faker.person.sexType();
  const dateOfBirth = faker.date
    .between({
      from: "2006-01-01",
      to: "2013-12-31",
    })
    .toISOString()
    .split("T")[0]; // format: YYYY-MM-DD
  const birthDate = new Date(dateOfBirth);
  const strand = faker.helpers.arrayElement([
    "STEM",
    "ABM",
    "ICT",
    "HUMSS",
    "GAS",
    "HE",
  ]);
  const year = faker.date
    .between({
      from: new Date().setFullYear(new Date().getFullYear() - 18),
      to: new Date().setFullYear(new Date().getFullYear() - 15),
    })
    .getFullYear();
  const gradeLevel = faker.helpers.arrayElement([11, 12]);
  const address = faker.location.streetAddress();
  const phone = faker.phone.number("09#########");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const referenceNumber = randomUUID();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  const student = {
    // student details
    firstName,
    lastName,
    middleName,
    guardian,
    sex,
    dateOfBirth,
    age,
    strand,
    year,
    address,
    phone,
    gradeLevel,
    referenceNumber,
    fullName,
  };
  const deepLowerCase = (obj) => {
    if (typeof obj !== "object") {
      return obj.toLowerCase();
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => deepLowerCase(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      if (typeof value === "string") {
        acc[key] = value.toLowerCase();
      } else if (typeof value === "object" && value !== null) {
        acc[key] = deepLowerCase(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  return deepLowerCase(student);
}

for (let i = 0; i < 7000; i++) {
  students.push(addStudent());
}

fs.writeFileSync("students.json", JSON.stringify(students, null, 2));