// Skeleton loader for car model/variant detail pages — matches CarModelPage layout
export default function CarDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-2">
        <div className="flex gap-2">
          <div className="h-3 w-14 bg-gray-200 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="lg:w-3/5">
            <div className="aspect-[16/10] bg-gray-200 rounded-xl" />
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-12 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:w-2/5 space-y-4">
            <div className="h-7 w-48 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="flex items-baseline gap-2 mt-3">
              <div className="h-8 w-36 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-28 bg-gray-200 rounded" />
            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-lg">
                  <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="flex gap-3 mt-4">
              <div className="h-11 flex-1 bg-gray-200 rounded-lg" />
              <div className="h-11 flex-1 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="mt-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-hidden py-3">
          {['Overview', 'Variants', 'Colors', 'Specs', 'Mileage', 'Reviews'].map((label) => (
            <div key={label} className="h-4 w-16 bg-gray-200 rounded flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Variants Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="h-6 w-52 bg-gray-200 rounded mb-4" />
        <div className="flex gap-3 mb-6">
          {['All', 'Petrol', 'Diesel', 'Manual'].map((f) => (
            <div key={f} className="h-8 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                </div>
                <div className="text-right">
                  <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Cars */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-8">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-60 flex-shrink-0 border border-gray-200 rounded-xl overflow-hidden">
              <div className="h-36 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
