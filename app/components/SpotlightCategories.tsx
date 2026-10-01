import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

import { Button } from "~/components/ui/button"
const categories = [
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

const spotlightItems = [
  {
    image: "/pocoxadid.webp",
    title: "  Pokemon x adidas",
    subtitle: "Shop the latest drops",
  },
  { image: "/seasonE.webp", title: "Seasonal Essentials", subtitle: "New season styles" },
  {
    image: "/spacejam.webp",
    title: "Jordan",
    subtitle: "Built for the outdoors",
  },
];

export default function SpotlightCategories() {
  return (
    <section>
      <div className="px-10">
        <div className="flex items-center gap-10 mx-auto w-full">
          <div className="shrink-0">
            <h2 className="text-2xl font-bold mb-4">Spotlight Categories</h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="min-w-0 flex-1 px-8"
          >
            <CarouselContent>
              {categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                >
                  <div
                    className={`px-6 py-3 ${item.className} rounded-3xl text-center overflow-hidden whitespace-nowrap`}
                  >
                    {item.text}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-10 max-md:-left-8" />
            <CarouselNext className="right-10 max-md:-right-8" />
          </Carousel>
        </div>
        {/* spotlight section */}
        <div className="mt-10 w-full px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {spotlightItems.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[3/4] w-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <button className="border border-black rounded-3xl px-6 py-3 text-sm font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
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
