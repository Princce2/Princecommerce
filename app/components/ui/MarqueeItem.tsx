type MarqueeItemProps = {
  text: string;
  icon?: string;
  className?: string;
};

function MarqueeItem({ text, icon, className = "", }: MarqueeItemProps) {
  return (
    <div className="flex shrink-0 items-center">
      <span
        className={`px-10 py-2 text-sm font-medium tracking-widest whitespace-nowrap md:text-base ${className}`}
      >
        {text}
      </span>

      {icon ? <span className="text-xl">{icon}</span> : null}
    </div>
  );
}
export { MarqueeItem }