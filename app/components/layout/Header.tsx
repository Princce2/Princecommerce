import { useState, useRef, useEffect } from "react";
import HeroCarousel from "~/components/HeroCarousel";
import SearchInput from "~/components/SearchInput";
import CountrySelector from "~/components/CountrySelector";
import { EllipsisVertical, Settings, Lock, Star } from "lucide-react";

const accountMenu = [
  { label: "My Account", href: "/info/contact-us" },
  { label: "Find a store", href: "/info/contact-us" },
  { label: "Help", href: "/info/faqs" },
  { label: "Track my order", href: "/info/track-my-order" },
  { label: "Delivery & Returns", href: "/info/delivery-and-returns-info" },
];

const navLinks = [
  { label: "New In", href: "/" },
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Sale", href: "#" },
];

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  return (
    <>
      <HeroCarousel />

      <header className="flex flex-wrap items-stretch bg-black text-white">
        <button
          type="button"
          aria-label="Menu"
          className="flex items-center border-r border-white/40 px-4"
        >
          <EllipsisVertical className="size-5" />
        </button>

        <a href="/" className="flex items-center px-6">
          <img src="/Sizelo.png" alt="size?" className="w-30" />
        </a>

        <nav className="flex min-w-0 flex-1 flex-wrap items-stretch">
          <ul className="flex items-center gap-7 px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-[15px] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="min-w-0 flex-1 border-l border-white/40 px-6 py-3">
            <SearchInput />
          </div>

          <div className="flex items-center border-l border-white/40 px-5">
            <CountrySelector />
          </div>

          <div className="flex items-center gap-5 border-l border-white/40 px-5">
            <div
              ref={accountRef}
              className="relative flex items-center"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                type="button"
                aria-label="Settings and account menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
                className="hover:opacity-75"
              >
                <Settings className="size-5" />
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  aria-label="Account"
                  className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-5"
                >
                  <div className="bg-[#1e1e1e] py-4 text-white shadow-xl">
                    {accountMenu.map((item) => (
                      <a
                        key={item.label}
                        role="menuitem"
                        href={item.href}
                        className="block px-4 py-2.5 text-center text-[15px] hover:underline"
                      >
                        {item.label}
                      </a>
                    ))}
                    <a
                      role="menuitem"
                      href="/info/gift-cards"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 text-center text-[15px] hover:underline"
                    >
                      Wishlist
                      <Star className="size-4" />
                    </a>
                    <div aria-hidden className="h-1" />
                  </div>
                </div>
              )}
            </div>

            <button type="button" aria-label="Basket" className="hover:opacity-75">
              <Lock className="size-5" />
            </button>
          </div>

          <div className="flex items-center px-6 text-[15px]">
            Basket is empty
          </div>
        </nav>
      </header>
    </>
  );
}