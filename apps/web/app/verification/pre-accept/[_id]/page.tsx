import { GetVerificationByIdAction } from "@/actions/verification/get-verification";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import Form from "./form";
import _ from "lodash";
import { getDocumentsSearchAction } from "@/actions/documents/get-documents";

export default async function Page({ params: { _id } }) {
  const data = await GetVerificationByIdAction(_id,{verified:false});
  const documents = await getDocumentsSearchAction("", 1, 0,{active_status:true});

  if (!data) throw new Error("Verification ID not found");
  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={"/"} legacyBehavior passHref>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={"/verification"} legacyBehavior passHref>
              <BreadcrumbLink>Verification</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form data={data} documents={documents.results} />
    </div>
  );
}
