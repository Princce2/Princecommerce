import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { countries } from "~/components/CountrySelector";

type FooterLink = { label: string; slug: string };

const footerLinksRow1: readonly FooterLink[] = [
  { label: "Contact Us", slug: "contact-us" },
  { label: "Track my Order", slug: "track-my-order" },
  { label: "Size Guides", slug: "size-guides" },
  { label: "Delivery and Returns Info", slug: "delivery-and-returns-info" },
  { label: "Payment Methods", slug: "payment-methods" },
  { label: "Cookie Settings", slug: "cookie-settings" },
  { label: "Modern Slavery Statement", slug: "modern-slavery-statement" },
  { label: "Corporate", slug: "corporate" },
];

const footerLinksRow2: readonly FooterLink[] = [
  { label: "Student Discount", slug: "student-discount" },
  { label: "Emergency Services Discount", slug: "emergency-services-discount" },
  { label: "Terms & Conditions", slug: "terms-and-conditions" },
  { label: "Klarna", slug: "klarna" },
  { label: "Become an Affiliate", slug: "become-an-affiliate" },
  { label: "Gift Cards", slug: "gift-cards" },
  { label: "FAQs", slug: "faqs" },
];

const bottomLinks: readonly FooterLink[] = [
  { label: "FAQs", slug: "faqs" },
  { label: "Accessibility", slug: "accessibility" },
  { label: "WEEE", slug: "weee" },
  { label: "Terms & Conditions", slug: "terms-and-conditions" },
  { label: "Cookies", slug: "cookies" },
  { label: "Careers", slug: "careers" },
  { label: "Site Security", slug: "site-security" },
  { label: "Privacy", slug: "privacy" },
];

export default function Footer() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const otherCountries = countries.filter(
    (country) => country.name !== selectedCountry.name,
  );

  return (
    <footer className="bg-black text-white py-4 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center">Download our apps</h1>
        <hr className="my-4 border-white/60" />

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-20 mb-4">
            <div>
              <p className="mb-3 font-semibold">app</p>
              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/Googleplay.png" alt="Get it on Google Play" className="h-10 w-auto" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/Applebadge.svg" alt="Download on the App Store" className="h-10 w-auto" />
                </a>
              </div>
            </div>
            <div>
              <p className="mb-3 font-semibold">launches</p>
              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/Googleplay.png" alt="Get it on Google Play" className="h-10 w-auto" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/Applebadge.svg" alt="Download on the App Store" className="h-10 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-10 mt-10">Sign up to get <span className="font-bold text-xl sm:text-2xl">10% off*</span></p>
        <Input placeholder="Enter your email here" className="mx-auto max-w-md" />
        <p className="mt-5">
          *Exclusions apply. We will use your information in <br /> accordance
          with our privacy policy
        </p>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/Trustpilotbadge.png"
            alt="Get it on Google Play"
            className="h-12 w-auto flex items-center justify-center mx-auto mt-10 mb-10"
          />
        </a>

        <div className="flex justify-center gap-6 sm:gap-8 mb-8 text-2xl md:text-3xl">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <FaXTwitter />
          </a>

          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>

          <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
            <span className="font-bold text-2xl">[si]</span>
          </a>

          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>

        <Button className="rounded-none bg-white text-black hover:bg-black hover:text-white border-none mb-12 px-10 sm:px-16 py-6 h-auto text-sm font-semibold tracking-wide">
          FIND YOUR NEAREST STORE
        </Button>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm mb-8">
          {footerLinksRow1.map((link) => (
            <Link
              key={link.slug}
              to={`/info/${link.slug}`}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm mb-4">
          {footerLinksRow2.map((link) => (
            <Link
              key={link.slug}
              to={`/info/${link.slug}`}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-14 mb-10">
          {pickerOpen ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Close country selector"
                onClick={() => setPickerOpen(false)}
                className="absolute right-0 top-0 text-white hover:opacity-75"
              >
                <X className="size-8" />
              </button>

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

              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
                {otherCountries.map((country) => (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setPickerOpen(false);
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
            </div>
          ) : (
            <>
              <p className="mb-8 text-lg">Deliver To</p>
              <button
                type="button"
                aria-label={`Open delivery country selector. Current country: ${selectedCountry.name}`}
                onClick={() => setPickerOpen(true)}
                className="mx-auto flex w-full max-w-md items-center gap-4 bg-white px-6 py-4 text-black hover:bg-gray-100"
              >
                <img
                  src={selectedCountry.flag}
                  alt=""
                  className="h-7 w-10 object-cover"
                />
                <span className="text-base">
                  {selectedCountry.name.toUpperCase()}
                </span>
                <ChevronDown className="ml-auto size-5" />
              </button>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 pt-2 md:flex-row md:items-end md:justify-between text-left">
          <div>
            <p className="text-sm text-gray-300">
              Copyright &copy; {new Date().getFullYear()} JD Sports Fashion Plc.
              All rights reserved.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <img src="/payment/visa.svg" alt="Visa" className="h-7 w-auto" />
              <img src="/payment/visa-electron.svg" alt="Visa Electron" className="h-7 w-auto" />
              <img src="/payment/mastercard.svg" alt="Mastercard" className="h-7 w-auto" />
              <img src="/payment/maestro.svg" alt="Maestro" className="h-7 w-auto" />
              <img src="/payment/amex.svg" alt="American Express" className="h-7 w-auto" />
              <img src="/payment/paypal.svg" alt="PayPal" className="h-7 w-auto" />
              <img src="/payment/klarna.svg" alt="Klarna" className="h-7 w-auto" />
              <img src="/payment/unionpay.svg" alt="UnionPay" className="h-7 w-auto" />
              <img src="/payment/discover.svg" alt="Discover" className="h-7 w-auto" />
              <img src="/payment/apple-pay.svg" alt="Apple Pay" className="h-7 w-auto" />
              <img src="/payment/google-pay.svg" alt="Google Pay" className="h-7 w-auto" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-300">
            {bottomLinks.map((link) => (
              <Link
                key={link.slug}
                to={`/info/${link.slug}`}
                className="hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}