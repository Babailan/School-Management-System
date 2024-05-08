import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import Link from "next/link";
import FilterAccessControl from "./components/filter";
import { getAuth } from "@/lib/crypto/getAuth";
import _ from "lodash";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TableAccessControl from "./components/table-access-control";

export default async function AccessControlPage() {
  const session = await getAuth();
  if (!(_.intersection(session.roles, ["administrator"]).length == 1)) {
    throw Error("You don't have access to this page.");
  }
  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" legacyBehavior>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Access Control</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Access Control</h1>
        <Link href={"/access-control/create"}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </Link>
      </div>
      <FilterAccessControl />
      <TableAccessControl />
    </div>
  );
}
