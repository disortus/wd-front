import clsx from "clsx";

const variants = {
  primary:
    "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
  secondary:
    "bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-300",
  outline:
    "border border-gray-300 text-black hover:bg-gray-50 active:bg-gray-100",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-black",
  link: "text-black underline hover:text-gray-700 p-0",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  loading,
  fullWidth,
  ...props
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-sans font-medium rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        loading && "opacity-70 pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}