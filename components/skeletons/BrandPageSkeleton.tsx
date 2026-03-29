// Skeleton loader for brand pages (e.g., /hyundai-cars, /tata-cars)
export default function BrandPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Brand Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-72 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Model Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-6 w-52 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-40 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-36 bg-gray-200 rounded" />
                <div className="h-6 w-28 bg-gray-200 rounded" />
                <div className="flex gap-4">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-9 w-full bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
