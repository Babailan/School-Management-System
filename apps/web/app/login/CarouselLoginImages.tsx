"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function () {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="my-5">
        <CarouselItem>
          <AspectRatio ratio={16 / 9}>
            <div className="h-full rounded-md bg-primary"></div>
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={16 / 9}>
            <div className="h-full rounded-md bg-primary"></div>
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
