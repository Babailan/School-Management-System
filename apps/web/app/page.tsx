import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import HarvardImage from "./login/harvard_image.png";

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">School Management System</h1>
        <p className="text-muted-foreground">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div>
        <AspectRatio ratio={16 / 6} className="bg-muted">
          <Image
            fill
            src={HarvardImage}
            alt="Photo by Drew Beamer"
            className="object-cover rounded-sm"
            sizes="100vw"
          />
        </AspectRatio>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>I forgot your pin?</AccordionTrigger>
            <AccordionContent>Answer. Contact the administrator</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
