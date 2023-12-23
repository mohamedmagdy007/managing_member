export default function Button({
  children,
  className,
  color = "bg-main-color text-white",
  ...props
}: customButtonType) {
  return (
    <button
      className={`w-full flex items-center outline-none justify-center rounded-xl shadow-sm font-bold px-4  py-2 transition-all border-2   ${className}  ${
        props.disabled
          ? "disabled:bg-gray-600 text-white pointer-events-none"
          : ` ${color}`
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
