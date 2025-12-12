// src/components/ui/button.tsx
export function Button({ children, className = '', onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-500/90 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// src/components/ui/input.tsx
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-3 py-2 border border-gray-300 rounded w-full ${className}`}
      {...props}
    />
  );
}

// src/components/ui/label.tsx
export function Label({ children, className = '', ...props }) {
  return (
    <label className={`block text-sm font-medium mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
}
