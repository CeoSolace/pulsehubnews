export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`px-3 py-2 border border-gray-300 rounded w-full ${className}`}
      {...props}
    />
  );
}
