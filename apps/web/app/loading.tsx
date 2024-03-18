import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading({ disablePadding = false }) {
  return (
    <div className={cn("space-y-2", disablePadding ? "" : "p-10")}>
      <Skeleton className="h-20"></Skeleton>
      <Skeleton className="h-screen"></Skeleton>
    </div>
  );
}
