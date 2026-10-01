import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

import { Button } from "~/components/ui/button"
type Category = {
  text: string;
  className: string;
};

type SpotlightItem = {
  image: string;
  title: string;
  subtitle: string;
};

const categories: readonly Category[] = [
  {
    text: "Men's Footwear",
    className: "bg-black text-white font-bold",
  },
  {
    text: "Women's Footwear",
    className: "bg-black text-white font-bold",
  },
  {
    text: "adidas",
    className: "bg-black text-white font-bold",
  },
  {
    text: "Nike",
    className: "bg-black text-white font-bold",
  },
  {
    text: "ASICS",
    className: "bg-black text-white font-bold",
  },
  {
    text: "Coats & Jackets",
    className: "bg-black text-white font-bold",
  },
  {
    text: "Home Grown",
    className: "bg-black text-white font-bold",
  },
  {
    text: "Accessories",
    className: "bg-black text-white font-bold",
  },
  {
    text: "T-Shirts",
    className: "bg-black text-white font-bold",
  },
];

const spotlightItems: readonly SpotlightItem[] = [
  {
    image: "/pocoxadid.webp",
    title: "Pokemon x adidas",
    subtitle: "Shop the latest drops",
  },
  { image: "/seasonE.webp", title: "Seasonal Essentials", subtitle: "New season styles" },
  {
    image: "/spacejam.webp",
    title: "Jordan",
    subtitle: "Built for the outdoors",
  },
];

export default function SpotlightCategories(): React.ReactElement {
  return (
    <section>
      <div className="px-4 sm:px-10">
        <div className="flex items-center gap-4 sm:gap-10 mx-auto w-full">
          <div className="shrink-0">
            <h2 className="text-2xl font-bold mb-4">Spotlight Categories</h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="min-w-0 flex-1 sm:px-8"
          >
            <CarouselContent>
              {categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="max-md:basis-auto md:basis-1/4"
                >
                  <div
                    className={`px-4 py-2.5 text-sm sm:px-6 sm:py-3 ${item.className} rounded-3xl text-center overflow-hidden whitespace-nowrap`}
                  >
                    {item.text}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-10 max-md:left-1" />
            <CarouselNext className="right-10 max-md:right-1" />
          </Carousel>
        </div>
        {/* spotlight section */}
        <div className="mt-10 w-full">
          <div className="grid grid-cols-3 gap-4 sm:gap-10">
            {spotlightItems.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-3/4 w-full object-cover mb-4"
                />
                <h3 className="whitespace-nowrap text-base sm:text-xl font-semibold mb-3">{item.title}</h3>
                <button className="border border-black rounded-3xl px-5 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
