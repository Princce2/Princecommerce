import React from "react";
import LandCarousel from "~/components/LandCarousel";
import SpotlightCategories from "~/components/SpotlightCategories";
import { ArrowUpRight } from "lucide-react";

type BlogPost = {
  image: string;
  title: string;
  excerpt: string;
};

const blogPosts: readonly BlogPost[] = [
  {
    image: "/Stussy.jpg",
    title: "A Brief History: How Stüssy Became the Godfathers of Streetwear",
    excerpt:
      "Early Beginnings In 1980, California local Shawn Stüssy began creating surfboards that combined specific performance shapes with a...",
  },
  {
    image: "/Nikeconic.jpg",
    title: "What is Nike ACG – the History of Nike's Iconic Sub-Label",
    excerpt:
      "What does Nike ACG stand for? Nike ACG stands for All Conditions Gear – a name which references...",
  },
];

export default function Landing(): React.ReactElement {
  return (
    <div className="">
      <div>
        <img src="/Sizelanding.webp" className="w-full" />
      </div>

      <div className="px-4 sm:px-10 py-6 sm:py-10 flex justify-center">
        <img src="/Sizeland2.webp" className="w-full max-w-3xl" />
      </div>

      <div className="flex flex-wrap items-center px-4 sm:px-10 gap-4 pb-4 sm:pb-10">
        <h1 className="text-bold text-2xl sm:text-5xl">Top Picks</h1>
        <div className="flex gap-3 font-semibold">
          <p className="border text-sm sm:text-xl rounded-3xl px-4 py-2 bg-black text-white flex justify-center">
            Men's
          </p>
          <p className="border text-sm sm:text-xl rounded-3xl px-4 py-2 flex justify-center">
            Women
          </p>
        </div>
      </div>
      <LandCarousel />

      <div className="px-4 sm:px-16 py-8 sm:py-16">
        <img src="/Fullprice.webp" className="w-full" />
      </div>

      <SpotlightCategories />

      <div>
        <img src="/usecode.webp" className="w-full px-4 sm:px-16 py-8 sm:py-16" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-15 justify-center max-w-[1280px] mx-auto px-4 md:px-0">
        <div className="flex flex-col">
          <img src="/UGG.webp" className="w-full" />
          <h3 className="text-lg sm:text-3xl font-semibold mb-3 mt-3">UGG</h3>
          <button className="border border-black rounded-3xl px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-lg font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
            Shop Now
          </button>
        </div>
        <div className="flex flex-col">
          <img src="/Curated.webp" className="w-full" />
          <h3 className="text-lg sm:text-3xl font-semibold mb-3 mt-3">Curated for Her</h3>
          <button className="border border-black rounded-3xl px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-lg font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>

      <div>
        <img src="/Klarna.webp" className="w-full max-w-[1280px] mx-auto mt-10 sm:mt-40 px-4 md:px-0" />
      </div>

      <div>
        <img src="/SALOOMON.webp" className="w-full mt-10 sm:mt-20" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-10 pt-12 sm:pt-24 pb-10">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">Our blog</h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold underline underline-offset-4 hover:text-orange-500"
          >
            VIEW ALL
            <ArrowUpRight className="size-4 text-orange-500" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-15">
          {blogPosts.map((post) => (
            <a key={post.title} href="#" className="group block">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[12/5] w-full object-cover"
              />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 sm:mt-6 mb-4">
                {post.title}
              </h3>
              <p className="line-clamp-2">{post.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}