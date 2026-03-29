// Skeleton loader for search page
export default function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="h-12 w-full bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 mb-3">
            <div className="w-24 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
