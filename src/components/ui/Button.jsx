import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        "h-11 px-6 rounded-xl text-sm font-medium transition",
        variant === "primary" &&
          "bg-black text-white hover:bg-[#222]",
        variant === "outline" &&
          "border border-border hover:bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}