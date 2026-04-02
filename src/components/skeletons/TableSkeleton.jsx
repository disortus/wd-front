export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gray-100 h-10" />
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 border-t border-gray-100 flex items-center px-4 gap-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16 ml-auto" />
        </div>
      ))}
    </div>
  );
}