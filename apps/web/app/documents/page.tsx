"use client";

import { getDocumentsSearchAction } from "@/actions/documents/get-documents";
import { Button } from "@/components/ui/button";
import {
  CircleDot,
  Dot,
  Ellipsis,
  Plus,
  ShieldPlus,
  Trash,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { diff } from "deep-object-diff";
import _ from "lodash";
import { updateDocumentAction } from "@/actions/documents/update-documents";

export default function Page() {
  const { data, refetch } = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocumentsSearchAction("", 1, 0),
  });

  const updateDocument = async (_id, DocumentChange) => {
    const result = await updateDocumentAction(
      _id,
      JSON.stringify(DocumentChange)
    );
    if (result.success) {
      refetch();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Documents</h1>
        </div>
        <Link href="/documents/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4 " />
            Create Document
          </Button>
        </Link>
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead className="max-w-16">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results?.map((document) => (
            <TableRow key={document._id as string}>
              <TableCell className="uppercase w-max">
                {document.document_name}
              </TableCell>
              <TableCell>
                <Badge
                  variant={document?.active_status ? "default" : "destructive"}
                >
                  {document?.active_status ? "Enabled" : "Disabled"}
                </Badge>
              </TableCell>
              <TableCell className="text-right ">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-30}
                    side="bottom"
                    className="m-4"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="gap-2">
                        Status
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={async (e) => {
                              const changes = diff(
                                document,
                                _.merge(
                                  { ...document },
                                  { active_status: true }
                                )
                              );
                              await updateDocument(document._id, changes);
                            }}
                          >
                            <Dot
                              className={cn(
                                "stroke-[10px] size-2",
                                document?.active_status
                                  ? "visible"
                                  : "invisible"
                              )}
                            />
                            Enabled
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={async (e) => {
                              const changes = diff(
                                document,
                                _.merge(
                                  { ...document },
                                  { active_status: false }
                                )
                              );
                              await updateDocument(document._id, changes);
                            }}
                          >
                            <Dot
                              className={cn(
                                "stroke-[10px] size-2",
                                document?.active_status
                                  ? "invisible"
                                  : "visible"
                              )}
                            />
                            Disabled
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
