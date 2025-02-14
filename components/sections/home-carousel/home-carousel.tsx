"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CTAButton } from "@/components/cta-button";
import { Typography } from "@/components/typography";

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  noRedirect?: boolean;
}

const slides: CarouselSlide[] = [
  {
    image: "/images/get-your-most-wanted-cards.jpg",
    title: "Get Your Most Wanted Cards",
    description:
      "Find and trade the cards you've been looking for with our community of collectors.",
    ctaText: "Start Trading Now",
    ctaHref: "/trades",
    noRedirect: false,
  },
  {
    image: "/images/lots-of-cards.jpg",
    title: "Active Trading Community",
    description: "Browse through thousands of active trades from collectors around the world.",
    ctaText: "Explore Trades",
    ctaHref: "/trades",
    noRedirect: true,
  },
];

export function HomeCarousel() {
  return (
    <section className="w-full relative">
      <Carousel className="w-full shadow-lg rounded-xl rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[50vh] w-full rounded-xl rounded-tl-3xl rounded-br-3xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-tl-3xl rounded-br-3xl"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl rounded-tl-3xl rounded-br-3xl overflow-hidden" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[80px]">
                  <Typography variant="h1" text={slide.title} className="text-white mb-4" />
                  <Typography
                    variant="p"
                    text={slide.description}
                    className="text-white mb-8 max-w-2xl"
                  />
                  <CTAButton href={slide.ctaHref} text={slide.ctaText} noRedirect={true} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}
