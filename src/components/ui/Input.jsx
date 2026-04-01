export default function Input(props) {
  return (
    <input
      className="
        w-full
        h-11
        px-4
        rounded-xl
        border
        border-border
        focus:outline-none
        focus:ring-2
        focus:ring-black
      "
      {...props}
    />
  );
}