import { GetAllFacultyActions } from "@/actions/faculty/get-faculty";
import { GetSectionByIdAction } from "@/actions/section/get-section";
import { Box, Flex, Heading, Text, Table, Button } from "@radix-ui/themes";
import AppendTeacher from "./appendTeacher";
export default async function Page({ params }) {
  const _id = params._id;
  const faculty = await GetAllFacultyActions();
  const section = await GetSectionByIdAction(_id);
  const subjects = section?.subjects ?? [];

  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>
          Section: {section.sectionName} - {section.year}
        </Heading>
        <Text color="gray">
          {section.gradeLevel} - {section.strand}
        </Text>
      </Flex>
      <Flex direction="column">
        <Heading size={"3"}>Subjects</Heading>
        <Text size={"2"} color="gray">
          List of subjects
        </Text>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              Subject Teacher / Instructor
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {subjects?.map(({ subjectName, subjectCode, subject_teacher }) => {
            return (
              <Table.Row>
                <Table.Cell className="uppercase">{subjectName}</Table.Cell>
                <Table.Cell className="uppercase">{subjectCode}</Table.Cell>
                <Table.Cell>
                  {subject_teacher ?? (
                    <Text color="red" weight="medium">
                      No teacher is selected
                    </Text>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

      <Flex direction="column">
        <Heading size={"3"}>Subject Teachers</Heading>
        <Text size={"2"} color="gray">
          List of subject teacher
        </Text>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Middle Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {faculty?.map(({ firstName, lastName, middleName }) => {
            return (
              <Table.Row align="center">
                <Table.Cell className="uppercase">{firstName}</Table.Cell>
                <Table.Cell className="uppercase">{lastName}</Table.Cell>
                <Table.Cell>{middleName}</Table.Cell>
                <Table.Cell justify="end">
                  <AppendTeacher />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
