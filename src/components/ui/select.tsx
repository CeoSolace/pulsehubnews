export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`px-3 py-2 border border-gray rounded w-full ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

// Dummy exports for destructuring
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
export const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
