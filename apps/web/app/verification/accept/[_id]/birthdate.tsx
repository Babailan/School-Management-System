"use client";

import { Box, Text, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";

export default function ({ date }) {
  const [birthdate, setBirthdate] = useState<Date>(new Date(date));
  // exact date today age
  const age =
    new Date(new Date().getTime() - birthdate.getTime()).getFullYear() - 1970;
  return (
    <>
      <Box>
        <Text size="2">Birth Date</Text>
        <TextFieldInput
          type="date"
          onChange={(e) => {
            //check if e.targer.value is valid format date
            if (e.target.value) {
              setBirthdate(new Date(e.target.value));
            }
          }}
          defaultValue={birthdate.toISOString().split("T")[0]}
          name="birthdate"
        ></TextFieldInput>
      </Box>
      <Box>
        <Text size="2">Age</Text>
        <TextFieldInput readOnly value={age} name="age"></TextFieldInput>
      </Box>
    </>
  );
}
