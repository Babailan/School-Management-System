// Generate a student verification collection and append it to array

const { faker } = require("@faker-js/faker");
const { randomUUID } = require("crypto");
const fs = require("fs");
const students = [];

const deepLowerCase = (obj) => {
  if (typeof obj !== "object") {
    return obj.toLowerCase();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === "string") {
        return item.toLowerCase();
      } else if (typeof item === "object" && item !== null) {
        return deepLowerCase(item);
      } else {
        return item;
      }
    });
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

function addStudent() {
  // student details
  const guardian = faker.person.fullName();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const middleName = faker.person.middleName();
  const fullName = `${lastName} ${firstName} ${middleName}`;
  const sex = faker.person.sexType();
  const birthday = faker.date
    .between({
      from: "2006-01-01",
      to: "2013-12-31",
    })
    .toISOString()
    .split("T")[0]; // format: YYYY-MM-DD
  const birthDate = new Date(birthday);
  const strand = faker.helpers.arrayElement([
    "stem",
    "abm",
    "ict",
    "humss",
    "gas",
    "he",
  ]);
  const year = faker.date
    .between({
      from: new Date().setFullYear(new Date().getFullYear() - 18),
      to: new Date().setFullYear(new Date().getFullYear() - 15),
    })
    .getFullYear()
    .toString();
  const gradeLevel = faker.helpers.arrayElement([11, 12]).toString();
  const address = faker.location.streetAddress();
  const phone = faker.phone.number("09#########");
  const referenceNumber = randomUUID();
  const email = faker.internet.email({ firstName, lastName });
  const lrn = faker.number.bigInt({ min: 100000000000, max: 199999999999 }).toString();

  const student = {
    firstName,
    lastName,
    middleName,
    guardian,
    sex,
    birthday,
    strand,
    year,
    address,
    phone,
    gradeLevel,
    referenceNumber,
    fullName,
    verified: false,
    lrn,
    email,
  };

  return deepLowerCase(student);
}

for (let i = 0; i < 30; i++) {
  students.push(addStudent());
}

fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
