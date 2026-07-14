interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 py-3 font-semibold text-white transition hover:opacity-90"
    >
      {children}
    </button>
  );
}