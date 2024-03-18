import ListSubjectPage from "./list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YASCI - Subject List",
};

export default async function Page() {
  return (
    <div className="p-10">
      <ListSubjectPage></ListSubjectPage>
    </div>
  );
}
