import { useState, useRef, useEffect, type ReactNode } from "react";
import HeroCarousel from "~/components/HeroCarousel";
import SearchInput from "~/components/SearchInput";
import CountrySelector, { countries } from "~/components/CountrySelector";
import {
  Ellipsis,
  Settings,
  Lock,
  Star,
  Search,
  Menu,
  X,
  ChevronDown,
  CircleUserRound,
  CircleHelp,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

type NavLink = { label: string; href: string };

type MobileNavLink = NavLink & { icon?: ReactNode };

const mobileNavLinks: readonly MobileNavLink[] = [
  { label: "New In", href: "/" },
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Sale", href: "#" },
  { label: "More", href: "#", icon: <Ellipsis className="size-5" /> },
  {
    label: "Account",
    href: "/login",
    icon: <CircleUserRound className="size-5" />,
  },
  { label: "Help", href: "/info/faqs", icon: <CircleHelp className="size-5" /> },
];

const accountMenu: readonly NavLink[] = [
  { label: "My Account", href: "/info/contact-us" },
  { label: "Find a store", href: "/info/contact-us" },
  { label: "Help", href: "/info/faqs" },
  { label: "Track my order", href: "/info/track-my-order" },
  { label: "Delivery & Returns", href: "/info/delivery-and-returns-info" },
];

const navLinks: readonly NavLink[] = [
  { label: "New In", href: "/" },
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Sale", href: "#" },
];

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

      <header className="flex items-stretch bg-black text-white">
        <a href="/" className="flex items-center px-4 md:px-6">
          <img src="/Sizelo.png" alt="size?" className="w-20 md:w-30" />
        </a>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden md:flex min-w-0 flex-1 items-stretch">
          <ul className="flex items-center gap-7 px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="whitespace-nowrap text-[15px] hover:underline">
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
                <div role="menu" aria-label="Account" className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-5">
                  <div className="bg-[#1e1e1e] py-4 text-white shadow-xl">
                    {accountMenu.map((item) => (
                      <a key={item.label} role="menuitem" href={item.href} className="block px-4 py-2.5 text-center text-[15px] hover:underline">
                        {item.label}
                      </a>
                    ))}
                    <a role="menuitem" href="/info/gift-cards" className="flex items-center justify-center gap-2 px-4 py-2.5 text-center text-[15px] hover:underline">
                      Wishlist <Star className="size-4" />
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
          <div className="flex items-center px-6 text-[15px]">Basket is empty</div>
        </nav>

        {/* Mobile icons — search, basket, menu — pushed to right */}
        <div className="flex md:hidden ml-auto items-center gap-5 px-4">
          <button type="button" aria-label="Search" className="hover:opacity-75">
            <Search className="size-5" />
          </button>
          <button type="button" aria-label="Basket" className="hover:opacity-75">
            <Lock className="size-5" />
          </button>

          {/* Mobile slide-in navigation drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                  className="hover:opacity-75"
                >
                  <Menu className="size-6" />
                </button>
              }
            />
            <SheetContent
              side="right"
              showCloseButton={false}
              className="gap-0 overflow-y-auto bg-black text-white md:max-w-md"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="flex items-center justify-between border-b border-white/15 bg-black px-4 py-3 text-white">
                <a href="/" onClick={() => setMobileOpen(false)}>
                  <img src="/Sizelo.png" alt="size?" className="w-16" />
                </a>
                <div className="flex items-center gap-5">
                  <button type="button" aria-label="Search" className="hover:opacity-75">
                    <Search className="size-5" />
                  </button>
                  <button type="button" aria-label="Basket" className="hover:opacity-75">
                    <Lock className="size-5" />
                  </button>
                  <SheetClose
                    render={
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="hover:opacity-75"
                      >
                        <X className="size-6" />
                      </button>
                    }
                  />
                </div>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-col">
                <button
                  type="button"
                  className="flex items-center justify-between border-b border-white/15 px-4 py-4 hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <img
                      src={countries[0].flag}
                      alt={`${countries[0].name} flag`}
                      className="h-6 w-8 object-cover"
                    />
                    <span className="text-sm font-semibold">UK</span>
                  </span>
                  <ChevronDown className="size-4 text-white/60" />
                </button>

                <p className="border-b border-white/15 px-4 py-4 text-[11px] font-bold tracking-wide">
                  size? FOR FOOTWEAR. NO QUESTION
                </p>

                {mobileNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-white/15 px-4 py-4 text-sm font-semibold hover:bg-white/10"
                  >
                    {link.icon ? (
                      <span className="flex items-center gap-3">
                        {link.icon}
                        {link.label}
                      </span>
                    ) : (
                      link.label
                    )}
                    <ChevronDown className="size-4 text-white/60" />
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-8 px-4 py-8">
                <a href="#" className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex size-7 items-center justify-center rounded bg-orange-500 text-base font-black text-white">
                    ?
                  </span>
                  size? app
                </a>
                <a href="#" className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex size-7 items-center justify-center rounded bg-orange-500 text-base font-black text-white">
                    ?
                  </span>
                  size? launches app
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}