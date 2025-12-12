export function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-3 py-2 border border-gray rounded w-full ${className}`}
      {...props}
    />
  );
}
