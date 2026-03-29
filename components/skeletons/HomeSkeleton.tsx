// Skeleton loader for the home page — matches the hero + car sections layout
export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 w-80 bg-gray-300/50 rounded mx-auto mb-4" />
          <div className="h-5 w-64 bg-gray-300/40 rounded mx-auto mb-8" />
          {/* Search Bar */}
          <div className="max-w-xl mx-auto h-12 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Cars by Budget */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-72 bg-gray-200 rounded mb-6" />
        <div className="flex gap-3 mb-6">
          {['₹8L', '₹10L', '₹15L', '₹20L', '₹25L'].map((b) => (
            <div key={b} className="h-9 w-24 bg-gray-200 rounded-full flex-shrink-0" />
          ))}
        </div>
        {/* Car Cards Row */}
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-60 flex-shrink-0 border border-gray-200 rounded-xl overflow-hidden">
              <div className="h-36 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-9 w-full bg-gray-200 rounded-lg mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cars */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-7 w-40 bg-gray-200 rounded mb-6" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-60 flex-shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="h-36 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-9 w-full bg-gray-200 rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-7 w-48 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
              <div className="h-3 w-14 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
