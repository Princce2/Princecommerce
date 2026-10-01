import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const countries = [
{ name: "United Kingdom", flag: "/flags/Unitedk.svg" },
  { name: "Deutschland", flag: "/flags/DEU.svg" },
  { name: "España", flag: "/flags/Spain.svg" },
  { name: "France", flag: "/flags/france.svg" },
  { name: "Ireland", flag: "/flags/ireland.svg" },
  { name: "Italia", flag: "/flags/italy.svg" },
  { name: "Nederland", flag: "/flags/NED.png" },
];

export default function CountrySelector({
  variant = "header",
}: {
  variant?: "header" | "footer";
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const otherCountries = countries.filter(
    (country) => country.name !== selectedCountry.name,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* The flag button in your header */}
      <DialogTrigger
        render={
          variant === "footer" ? (
            <button
              type="button"
              aria-label={`Select delivery country. Current country: ${selectedCountry.name}`}
              className="mx-auto flex w-full max-w-sm items-center justify-center gap-6 border-y-2 border-white/60 py-3 text-white hover:opacity-90"
            >
              <img
                src={selectedCountry.flag}
                alt=""
                className="h-8 w-10 object-cover"
              />
              <span className="font-semibold uppercase">
                {selectedCountry.name}
              </span>
            </button>
          ) : (
            <button
              type="button"
              aria-label={`Select country. Current country: ${selectedCountry.name}`}
              className="flex items-center gap-2 text-white"
            />
          )
        }
      >
        {variant === "header" && (
          <>
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              className="h-6 w-8 object-cover"
            />
            <ChevronDown className="size-3" />
          </>
        )}
      </DialogTrigger>

      {/* Full-screen dark overlay */}
      <DialogContent
        className="
          !fixed !inset-0 !left-0 !top-30
          !z-50 !flex !h-130 !w-screen !max-w-none
          !translate-x-0 !translate-y-0
          !flex-col !items-center !justify-start
          !rounded-none !border-0 !bg-gray-800/80
          !p-0 !text-white !shadow-none !pt-10
        "
      >
        <DialogTitle className="sr-only">Choose your country</DialogTitle>

        <div className="mt-32 w-full max-w-5xl px-6">
          {/* Currently selected country */}
          <div className="mx-auto flex max-w-sm items-center justify-center gap-6 border-y-2 border-white/60 py-3">
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              className="h-8 w-10 object-cover"
            />
            <span className="font-semibold uppercase">
              {selectedCountry.name}
            </span>
          </div>

          {/* Other country options */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
            {otherCountries.map((country) => (
              <button
                key={country.name}
                type="button"
                onClick={() => {
                  setSelectedCountry(country);
                  setOpen(false);
                }}
                className="flex items-center gap-4 text-left hover:opacity-75"
              >
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="h-6 w-8 object-cover"
                />
                <span className="border-b-2 border-white/70 font-semibold uppercase">
                  {country.name}
                </span>
              </button>
            ))}
          </div>

          {/* Close button */}
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex min-w-72 items-center justify-center gap-4 bg-white px-8 py-4 text-black hover:bg-gray-200"
            >
              <X className="size-5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
