import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAuth } from "@/lib/crypto/getAuth";
import _ from "lodash";
import CreateUserForm from "./components/form";
import Link from "next/link";

export default async function Page() {
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
            <Link href="/access-control" legacyBehavior>
              <BreadcrumbLink>Access Control</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <header className="text-3xl font-bold">Create User</header>
      </div>
      <CreateUserForm />
    </div>
  );
}
