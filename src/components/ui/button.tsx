export function Button({ children, className = '', onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue text-white rounded hover:bg-blue/90 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
