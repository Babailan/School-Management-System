import { Box } from "@radix-ui/themes";
import ListSubjectPage from "./list";
import { Suspense } from "react";
import Loading from "../loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YASCI - Subject List",
};

export default async function Page() {
  return (
    <Suspense fallback={<Loading p="6" />}>
      <Box p={"6"}>
        <ListSubjectPage></ListSubjectPage>
      </Box>
    </Suspense>
  );
}
