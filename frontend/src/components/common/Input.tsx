interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div className="mb-6">

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white outline-none transition focus:border-violet-500"
      />

    </div>
  );
}