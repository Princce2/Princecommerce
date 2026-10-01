import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

type CarouselImage = {
  image: string;
  price: string;
  description: string;
};

const images: readonly CarouselImage[] = [
  {
    image: "/AirMax.webp",
    price: "£175",
    description: "Air Max 95 'Greedy'",
  },
  {
    image: "/Carhartt.webp",
    price: "£150",
    description: "Carhartt WIP\nVista Hoodie",
  },
  {
    image: "/AirBakin.webp",
    price: "£145",
    description: "Air Bakin High SP",
  },
  {
    image: "/Trefoil.webp",
    price: "£60",
    description: "Originals Trefoil Essentials\nKnit Sweatshirt",
  },
  {
    image: "/Salomon.webp",
    price: "£165",
    description: "Salomon\nXT-6",
  },
  {
    image: "/Carhartt.webp",
    price: "£120",
    description: "Carhartt WIP\nAaron Pant",
  },
  {
    image: "/KeenJasper.webp",
    price: "£120",
    description: "Keen\nJasper",
  },
  {
    image: "/Adapt.webp",
    price: "£45",
    description: "Alte Systems\nAdapt Crew Shirt",
  },
  {
    image: "/Tobacco.webp",
    price: "£100",
    description: "adidas\nOriginals Tobacco Super",
  },
  {
    image: "/Hanks.webp",
    price: "£60",
    description: "Home Grown\nHank Shirt",
  },
];

export default function LandCarousel(): React.ReactElement {
  return (
    <div className="mx-auto w-full px-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4"
            >
              <div className="overflow-hidden rounded-xl mb-10">
                <img
                  src={item.image}
                  alt={item.description.replace("\n", " ")}
                  className="h-48 sm:h-64 w-full object-cover"
                />

                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{item.price}</h3>

                  <p className="mt-2 whitespace-pre-line text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
