import clsx from "clsx";

export function Badge({ children, color = "gray", className }) {
  const colors = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colors[color] || colors.gray,
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status, labels, colors, className }) {
  const label = labels?.[status] || status;
  const color = colors?.[status] || "gray";

  return <Badge color={color} className={className}>{label}</Badge>;
}

export function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={clsx(
          "relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
          "placeholder:text-gray-400",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        className={clsx(
          "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
          "placeholder:text-gray-400",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, className, children, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={clsx(
          "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Table({ columns, data, onRowClick, className }) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl">
      <table className={clsx("w-full text-sm", className)}>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-medium text-gray-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, idx) => (
            <tr
              key={idx}
              className={clsx(
                "border-b border-gray-100 last:border-0",
                onRowClick && "cursor-pointer hover:bg-gray-50 transition-colors"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {(!data || data.length === 0) && (
        <div className="text-center py-12 text-gray-500">Нет данных</div>
      )}
    </div>
  );
}

export function Checkbox({ label, checked, onChange, disabled, className }) {
  return (
    <label className={clsx("flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
