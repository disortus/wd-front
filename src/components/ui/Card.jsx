import clsx from "clsx";

export default function Card({ children, className, hover, onClick }) {
  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 rounded-2xl overflow-hidden",
        hover && "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}