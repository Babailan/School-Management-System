import { GetVerificationByIdAction } from "@/actions/verification/get-verification";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { updateVerificationAction } from "@/actions/verification/update-verification";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Form from "./form";
import { SelectTuition } from "@/components/select";

export default async function Page({ params: { _id } }) {
  const data = await GetVerificationByIdAction(_id);

  return (
    <div className="space-y-5 p-10">
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

      <SelectTuition />
      <h1 className="text-2xl font-semibold">Accept Student Verification</h1>
      <Form />
    </div>
  );
}
