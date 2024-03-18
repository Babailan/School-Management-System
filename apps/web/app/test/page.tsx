import { Skeleton } from "@/components/ui/skeleton";

export default function Test() {
  return (
    <div className="space-y-5 p-10">
      <Skeleton className="h-screen"></Skeleton>
      <Skeleton className="h-screen"></Skeleton>
      <Skeleton className="h-screen"></Skeleton>
      <Skeleton className="h-screen"></Skeleton>
    </div>
  );
}
