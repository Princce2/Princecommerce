import React from "react";
import { MarqueeItem } from "~/components/ui/MarqueeItem";
export default function HeroCarousel(): React.ReactElement {
 type MarqueeItemData = { text: string; className: string };
 const items: readonly MarqueeItemData[] = [
   {
     text: "Klarna Available",
     className: "bg-black text-white",
   },
   {
     text: "Get 10% off App! Use code APR10 *T&Cs apply",
     className: "bg-orange-500 text-white",
   },
   {
     text: "Free Standard Delivery on UK orders over £80",
     className: "bg-black text-white",
   },
   {
     text: "20% off Students & Emergency Services *T&Cs apply",
     className: "bg-orange-500 text-white",
   },
 ];

  return (
    <div className="overflow-hidden bg-black text-white">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0 items-center whitespace-nowrap">
          {items.map((item, index) => (
            <MarqueeItem
              key={`first-${index}`}
              text={item.text}
              className={item.className}
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center whitespace-nowrap">
          {items.map((item, index) => (
            <MarqueeItem
              key={`second-${index}`}
              text={item.text}
              className={item.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
