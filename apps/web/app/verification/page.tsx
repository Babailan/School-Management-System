import Loading from "../loading";
import Link from "next/link";
import { TypographyH3 } from "@/components/typography/h3";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Check, Edit2, Ellipsis } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import VerificationSearch from "./component/verification-search";
import TableVerification from "./component/table-verification";
import { Suspense } from "react";

export default function Page({ searchParams: { search, limit } }) {
  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Verification</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-2xl font-bold">Verification</h1>
      </div>
      <VerificationSearch />
      <Suspense fallback={<Loading disablePadding />}>
        <TableVerification search={search} limit={10} />
      </Suspense>
    </div>
  );
}
