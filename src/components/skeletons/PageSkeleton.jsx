export default function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Title placeholder */}
      <div className="h-8 bg-gray-200 rounded-xl w-48 mb-8" />
      
      {/* Content blocks */}
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}