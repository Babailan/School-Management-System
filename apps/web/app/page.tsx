import { TypographyH1 } from "@/components/typography/h1";
import { TypographyH3 } from "@/components/typography/h3";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-5 p-10">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Dashboard</div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      <div>
        <div className="flex gap-2 *:w-full">
          <Card className="p-5">
            <CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
            <strong className="text-2xl">$45,231.89</strong>
            <span className="text-sm block">+20.1% from last month</span>
          </Card>
          <Card className="p-5">
            <CardTitle className="font-medium text-sm">
              Enrolled Student
            </CardTitle>
            <strong className="text-2xl">5,231</strong>
            <span className="text-sm block">today</span>
          </Card>
        </div>
      </div>
    </div>
  );
}
