"use client";
import { GetCurriculumByIdAction } from "@/actions/curriculum/get-curriculum";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import EditCurriculumStrand from "./edit";
import Loading from "@/app/loading";
import { Strand } from "@/libs/helpers/strand";
import { Metadata } from "next";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params: { edit, strand } }) {
  const { data, isPending } = useQuery({
    queryFn: async () => await GetCurriculumByIdAction(edit),
    queryKey: ["curriculum", edit],
  });

  if (isPending) {
    return <Loading p="6" />;
  }
  return (
    <Box p="6">
      <Flex direction="column">
        <Heading>
          Curriculum {data.year} - {Number(data.year) + 1}
        </Heading>
        <Text color="gray" size="2">
          Editing curriculum for {Strand[strand]}
        </Text>
      </Flex>
      <EditCurriculumStrand
        isPending={isPending}
        subjects={data?.[strand] || []}
      />
    </Box>
  );
}
