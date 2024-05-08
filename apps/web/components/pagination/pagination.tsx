import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NormalPagination({ totalPage }) {
  const params = useSearchParams();
  const previous = () => {
    const currentPage = Number(params.get("page")) || 1;
    if (currentPage > 1) {
      const t = new URLSearchParams(params.toString());
      t.set("page", (currentPage - 1).toString());
      window.history.pushState(null, "", "?" + t.toString());
    }
  };
  const next = () => {
    const currentPage = Number(params.get("page")) || 1; // Get current page
    if (currentPage < totalPage) {
      const t = new URLSearchParams(params.toString());
      t.set("page", (currentPage + 1).toString()); // Increase page number
      window.history.pushState(null, "", "?" + t.toString());
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" className="gap-2" onClick={previous}>
            <ChevronLeft size={16} />
            Previous
          </Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" >
            {params.get("page") || 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <Button variant="outline" className="gap-2" onClick={next}>
            Next <ChevronRight size={16} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
