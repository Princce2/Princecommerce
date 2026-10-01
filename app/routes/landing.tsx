import LandCarousel from "~/components/LandCarousel";
import SpotlightCategories from "~/components/SpotlightCategories";
import { ArrowUpRight } from "lucide-react";
const blogPosts = [
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

export default function Landing() {
  return (
    <div className="">
      <div>
        <img src="/Sizelanding.webp" />
      </div>

      <div className="p-10 flex justify-center">
        <img src="/Sizeland2.webp" className="pr-25 pl-25" />
      </div>

      <div className="flex px-10 gap-15 pb-10">
        <h1 className="text-bold text-5xl">Top Picks</h1>
        <div className="flex gap-5 font-semibold">
          <p className="border text-xl rounded-3xl w-30 p-2 bg-black text-white flex justify-center">
            Men's
          </p>
          <p className="border text-xl rounded-3xl w-30 p-2 flex justify-center">
            Women
          </p>
        </div>
      </div>
      <LandCarousel />

      <div className="p-30">
        <img src="/Fullprice.webp" />
      </div>

      <SpotlightCategories />

      <div>
        <img src="/usecode.webp" className="p-30" />
      </div>

      <div className="flex flex-col-2 gap-15 justify-center max-w-[1280px] mx-auto">
        <div className="flex flex-col w-1/2">
          <img src="/UGG.webp" />
          <h3 className="text-3xl font-semibold mb-3">UGG</h3>
          <button className="border border-black rounded-3xl px-8 py-4 text-lg font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
            Shop Now
          </button>
        </div>
        <div className="flex flex-col w-1/2">
          <img src="/Curated.webp" />
          <h3 className="text-3xl font-semibold mb-3">Curated for Her</h3>
          <button className="border border-black rounded-3xl px-8 py-4 text-lg font-semibold w-fit hover:bg-black hover:text-white transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>

      <div>
        <img src="/Klarna.webp" className="w-full max-w-[1280px] mx-auto mt-40" />
      </div>

      <div>
        <img src="/SALOOMON.webp" className="mt-20" />
      </div>

      <div className="max-w-[1280px] mx-auto px-10 pt-24 pb-10">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl md:text-5xl">Our blog</h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold underline underline-offset-4 hover:text-orange-500"
          >
            VIEW ALL
            <ArrowUpRight className="size-4 text-orange-500" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-15">
          {blogPosts.map((post) => (
            <a key={post.title} href="#" className="group block">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[12/5] w-full object-cover"
              />
              <h3 className="text-2xl md:text-3xl font-bold mt-6 mb-4">
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