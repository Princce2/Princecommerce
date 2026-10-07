
import type { Route } from "./+types/catalog";
import { catalogData } from "./catalog.data";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
  const gender = params.gender as keyof typeof catalogData;

  const genderData = catalogData[gender];

  const category = params.category as keyof NonNullable<
    typeof genderData
  >;

  const categoryData = genderData?.[category];

  if (!categoryData) {
    throw new Response("Category not found", { status: 404 });
  }

  return {
    ...categoryData,
    gender,
    category,
  };
}

export default function CatalogPage({
  loaderData,
}: Route.ComponentProps) {
  const [showMore, setShowMore] = useState(false);
  const [gridColumns, setGridColumns] = useState(4);
  return (
    <main className="">
      <div className="text-center px-10 pt-10">
        <h1 className="text-4xl font-bold">{loaderData.title}</h1>

        <p className="mx-auto mt-8 max-w-7xl text-center text-lg leading-7 sm:border-l sm:border-r ">
          {loaderData.description}{" "}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="font-medium"
          >
            {showMore ? "Read less..." : "Read more..."}
          </button>
        </p>

        {/* Readmore */}
        {showMore && (
          <div className="mt-10 space-y-8 text-center">
            {loaderData.readMore.map((section) => (
              <section key={section.title}>
                <h2 className="font-bold">{section.title}</h2>

                <p className="mx-auto mt-2 max-w-6xl leading-7">
                  {section.description}
                </p>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* links */}
      <div className="mt-10 grid grid-cols-2 border-y border-gray-200 md:grid-cols-3 lg:grid-cols-6">
        {loaderData.links.map((link) => (
          <a
            key={link}
            href="#"
            className="flex min-h-14 items-center justify-center border-gray-200 px-4 py-3 text-center text-sm font-semibold uppercase hover:bg-gray-50 border-r lg:last:border-r-0"
          >
            {link}
          </a>
        ))}
      </div>

      {/* breadcrumb */}
      <nav className="px-10 py-6 text-sm">
        <a href="/">Home</a>

        <ChevronRight className="mx-2 inline h-4 w-4" />

        <span className="capitalize">{loaderData.gender}</span>

        <ChevronRight className="mx-2 inline h-4 w-4" />

        <span className="capitalize">{loaderData.category}</span>
      </nav>

      <div className="grid grid-cols-[240px_1fr] gap-6 px-10">
        {/* Filter sidebar */}
        <aside>
          {/* Filter heading */}
          <div className="flex h-14 items-center">
            <h2 className="text-sm font-bold">Brand</h2>
          </div>

          {/* Brand filters */}
          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm">adidas</p>
            <p className="text-sm">Nike</p>
            <p className="text-sm">ASICS</p>
            <p className="text-sm">Birkenstock</p>
          </div>
        </aside>

        {/* Products area */}
        <section>
          <div className="flex h-14 items-center justify-between border-y border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm">Sort by</span>

              <button
                type="button"
                className="h-10 border border-gray-200 px-4 text-sm"
              >
                Recommended
              </button>

              {/* Grid controls */}
              <div className="flex h-10 border border-gray-200 ">
                <button
                  type="button"
                  onClick={() => setGridColumns(3)}
                  className={`flex w-13 items-center justify-center ${
                    gridColumns === 3 ? "bg-gray-100" : ""
                  }`}
                  aria-label="Show 3 products per row"
                >
                  <span className="flex items-center gap-1">
                    <span
                      className={`size-2 ${
                        gridColumns === 3 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`size-2 ${
                        gridColumns === 3 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`size-2 ${
                        gridColumns === 3 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setGridColumns(4)}
                  className={`flex w-15 items-center justify-center border-l border-gray-200 ${
                    gridColumns === 4 ? "bg-gray-100" : ""
                  }`}
                  aria-label="Show 4 products per row"
                >
                  <span className="flex items-center gap-1">
                    <span
                      className={`size-2 ${
                        gridColumns === 4 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`size-2 ${
                        gridColumns === 4 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`size-2 ${
                        gridColumns === 4 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`size-2 ${
                        gridColumns === 4 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            <div className="text-sm">
              {loaderData.products.length} items:
              <button type="button" className="ml-2 font-bold underline">
                Show More
              </button>
            </div>
          </div>

          {/* Product grid will go here */}
          <div
            className={`mt-6 grid gap-4 ${
              gridColumns === 3 ? "grid-cols-3" : "grid-cols-4"
            }`}
          >
            {loaderData.products.map((product) => (
              <div key={product.name}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover"
                  />

                  <div className="absolute top-0 bg-gray-300 px-3 py-1 text-xs font-medium">
                    FREE DELIVERY
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium">{product.name}</h3>

                  <p className="mt-2 text-sm">£{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
