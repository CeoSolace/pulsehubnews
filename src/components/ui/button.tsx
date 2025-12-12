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
