
import type { Route } from "./+types/catalog";
import { catalogData } from "./catalog.data";
import { useState } from "react";

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

  return categoryData;
}

export default function CatalogPage({
  loaderData,
}: Route.ComponentProps) {
  const [showMore, setShowMore] = useState(false);
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
    </main>
  );
}
