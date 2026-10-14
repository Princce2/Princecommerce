import type { Route } from "./+types/catalog";
import { catalogData } from "./catalog.data";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
  const gender = params.gender as keyof typeof catalogData;
  const genderData = catalogData[gender];

  const category = params.category as keyof NonNullable<typeof genderData>;
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

export default function CatalogPage({ loaderData }: Route.ComponentProps) {
  const [showMore, setShowMore] = useState(false);
  const [gridColumns, setGridColumns] = useState(4);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(480);


const filteredProducts = loaderData.products.filter((product) => {
  const matchesBrand =
    selectedBrands.length === 0 || selectedBrands.includes(product.brand);

  const matchesSize =
    selectedSizes.length === 0 ||
    selectedSizes.some((size) => product.sizes.includes(size));

  const matchesStyle =
    selectedStyles.length === 0 ||
    product.styles.some((style) => selectedStyles.includes(style));

  const matchesColor =
    selectedColors.length === 0 ||
    product.colors.some((color) => selectedColors.includes(color));

  const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

  return (
    matchesBrand && matchesSize && matchesStyle && matchesColor && matchesPrice
  );
});


  const availableSizes = [
    ...new Set(loaderData.products.flatMap((product) => product.sizes)),
  ].sort((a, b) => a - b);

  const availableStyles = [
    ...new Set(loaderData.products.flatMap((product) => product.styles)),
  ].sort();

  const availableColors = [
    ...new Set(loaderData.products.flatMap((product) => product.colors)),
  ].sort();

  const availableBrands = [
    ...new Set(loaderData.products.map((product) => product.brand)),
  ].sort();

  return (
    <main>
      <div className="px-10 pt-10 text-center">
        <h1 className="text-4xl font-bold">{loaderData.title}</h1>

        <p className="mx-auto mt-8 max-w-7xl text-center text-lg leading-7 sm:border-l sm:border-r">
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

      {/* Links */}
      <div className="mt-10 grid grid-cols-2 border-y border-gray-200 md:grid-cols-3 lg:grid-cols-6">
        {loaderData.links.map((link) => (
          <a
            key={link}
            href="#"
            className="flex min-h-14 items-center justify-center border-r border-gray-200 px-4 py-3 text-center text-sm font-semibold uppercase hover:bg-gray-50 lg:last:border-r-0"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Breadcrumb */}
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
          {/* Brand filter */}
          <div className="flex h-14 items-center">
            <h2 className="text-sm font-bold">Brand</h2>
          </div>

          <div className="border-t border-gray-200 pt-5">
            {availableBrands.map((brand, index) => {
              const brandCount = loaderData.products.filter(
                (product) => product.brand === brand,
              ).length;

              return (
                <label
                  key={brand}
                  className={`flex items-center gap-3 text-sm ${
                    index > 0 ? "mt-4" : ""
                  } ${index === availableBrands.length - 1 ? "pb-10" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      setSelectedBrands((brands) =>
                        brands.includes(brand)
                          ? brands.filter((item) => item !== brand)
                          : [...brands, brand],
                      );
                    }}
                  />

                  <span className="flex items-center gap-1">
                    <span>{brand}</span>
                    <span className="text-gray-500">({brandCount})</span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Size filter */}
          <div className="flex h-14 items-center border-t border-gray-200">
            <h2 className="text-sm font-bold">Size</h2>
          </div>

          <div className="pt-2">
            {availableSizes.map((size) => {
              const sizeCount = loaderData.products.filter((product) =>
                product.sizes.includes(size),
              ).length;

              return (
                <label
                  key={size}
                  className="mt-4 flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => {
                      setSelectedSizes((sizes) =>
                        sizes.includes(size)
                          ? sizes.filter((item) => item !== size)
                          : [...sizes, size],
                      );
                    }}
                  />

                  <span className="flex items-center gap-1">
                    <span>{size}</span>
                    <span className="text-gray-500">({sizeCount})</span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Style filter */}
          <div className="mt-6 flex h-14 items-center border-t border-gray-200">
            <h2 className="text-sm font-bold">Style</h2>
          </div>

          <div className="pt-2">
            {availableStyles.map((style) => {
              const styleCount = loaderData.products.filter((product) =>
                product.styles.includes(style),
              ).length;

              return (
                <label
                  key={style}
                  className="mt-4 flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style)}
                    onChange={() => {
                      setSelectedStyles((styles) =>
                        styles.includes(style)
                          ? styles.filter((item) => item !== style)
                          : [...styles, style],
                      );
                    }}
                  />

                  <span className="flex items-center gap-1">
                    <span>{style}</span>
                    <span className="text-gray-500">({styleCount})</span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Colour filter */}
          <div className="mt-6 flex h-14 items-center border-t border-gray-200">
            <h2 className="text-sm font-bold">Colour</h2>
          </div>

          <div className="pb-10 pt-2">
            {availableColors.map((color) => {
              const colorCount = loaderData.products.filter((product) =>
                product.colors.includes(color),
              ).length;

              return (
                <label
                  key={color}
                  className="mt-4 flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => {
                      setSelectedColors((colors) =>
                        colors.includes(color)
                          ? colors.filter((item) => item !== color)
                          : [...colors, color],
                      );
                    }}
                  />

                  <span className="flex items-center gap-1">
                    <span>{color}</span>
                    <span className="text-gray-500">({colorCount})</span>
                  </span>
                </label>
              );
            })}
          </div>

          {/* Price filter */}
          <div className="mt-6 border-t border-gray-200">
            <div className="flex h-14 items-center justify-between">
              <h2 className="text-sm font-bold">Price</h2>

              <button
                type="button"
                onClick={() => {
                  setMinPrice(20);
                  setMaxPrice(480);
                }}
                className="text-xl leading-none"
                aria-label="Reset price filter"
              >
                ×
              </button>
            </div>

            {/* Dual-handle slider */}
            <div className="relative mt-2 h-8">
              {/* Slider track */}
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200">
                <div
                  className="absolute h-full bg-black"
                  style={{
                    left: `${((minPrice - 20) / 460) * 100}%`,
                    right: `${100 - ((maxPrice - 20) / 460) * 100}%`,
                  }}
                />
              </div>

              {/* Minimum price handle */}
              <input
                type="range"
                min={20}
                max={480}
                step={1}
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(Math.min(Number(event.target.value), maxPrice));
                }}
                aria-label="Minimum price"
                className="price-range-thumb absolute inset-0 z-20 h-full w-full"
              />

              {/* Maximum price handle */}
              <input
                type="range"
                min={20}
                max={480}
                step={1}
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(Math.max(Number(event.target.value), minPrice));
                }}
                aria-label="Maximum price"
                className="price-range-thumb absolute inset-0 z-10 h-full w-full"
              />
            </div>

            {/* Selected price range */}
            <p className="mt-3 text-center text-xs text-gray-700">
              From £{minPrice.toFixed(2)} - To £{maxPrice.toFixed(2)}
            </p>
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
              <div className="flex h-10 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setGridColumns(3)}
                  className={`group flex w-13 items-center justify-center ${
                    gridColumns === 3 ? "bg-gray-100" : ""
                  } hover:bg-black`}
                  aria-label="Show 3 products per row"
                >
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 3 }, (_, index) => (
                      <span
                        key={index}
                        className={`size-2 ${
                          gridColumns === 3
                            ? "bg-black group-hover:bg-gray-500"
                            : "bg-gray-500 group-hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setGridColumns(4)}
                  className={`group flex w-15 items-center justify-center border-l border-gray-200 ${
                    gridColumns === 4 ? "bg-gray-100" : ""
                  } hover:bg-black`}
                  aria-label="Show 4 products per row"
                >
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 4 }, (_, index) => (
                      <span
                        key={index}
                        className={`size-2 ${
                          gridColumns === 4
                            ? "bg-gray-500 group-hover:bg-gray-500"
                            : "bg-gray-300 group-hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </span>
                </button>
              </div>
            </div>

            <div className="text-sm">
              {filteredProducts.length} items:
              <button type="button" className="ml-2 font-bold underline">
                Show More
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div
            className={`mb-10 mt-6 grid gap-4 ${
              gridColumns === 3 ? "grid-cols-3" : "grid-cols-4"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <div key={`${product.name}-${index}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-65 w-full object-cover"
                  />

                  <div className="absolute top-0 w-full bg-[#979797] py-3 text-center text-xs font-medium text-gray-200">
                    FREE DELIVERY
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-xs text-red-500">{product.brand}</p>
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
