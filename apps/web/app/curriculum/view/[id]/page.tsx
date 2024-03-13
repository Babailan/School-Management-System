import { GetCurriculumByIdAction } from "@/actions/curriculum/get-curriculum";
import Loading from "@/app/loading";
import { Strand } from "@/libs/helpers/strand";
import {
  Box,
  Code,
  Flex,
  Heading,
  Table,
  Text,
  Link as RadixLink,
} from "@radix-ui/themes";
import Link from "next/link";
import numeral from "numeral";
import { Suspense } from "react";

export default async function Page({ params }) {
  const data = await GetCurriculumByIdAction(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <Box p="6" className="space-y-5">
        <Flex justify="between" align="center">
          <Box>
            <Heading>
              Curriculum {data.year} - {Number(data.year) + 1}
            </Heading>
            <Text size="2" color="gray">
              List of subjects of {numeral(data.semester).format("0o")} Semester
            </Text>
          </Box>
          <Box>
            <Link href={`/curriculum/${params.id}`} legacyBehavior>
              <RadixLink>Edit this Curriculum</RadixLink>
            </Link>
          </Box>
        </Flex>

        {Object.entries(Strand).map((strand, idx) => {
          const subjects = data?.[strand["0"]] ?? [];

          return (
            <Box className="space-y-2" key={idx}>
              <Flex justify="center">
                <Code>{strand["1"]}</Code>
              </Flex>
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>
                      Subject Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Subject Code
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {subjects.map(({ subjectName, subjectCode }, index) => (
                    <Table.Row key={index} className="uppercase font-medium">
                      <Table.Cell>{subjectName}</Table.Cell>
                      <Table.Cell>{subjectCode}</Table.Cell>
                    </Table.Row>
                  ))}
                  {subjects.length === 0 && (
                    <Table.Row align={"center"}>
                      <Table.Cell justify={"center"} colSpan={2}>
                        <Text weight="medium">
                          There are no available subjects in this strand at the
                          moment.
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Root>
            </Box>
          );
        })}
      </Box>
    </Suspense>
  );
}
