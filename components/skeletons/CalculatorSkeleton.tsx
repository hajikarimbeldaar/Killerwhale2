// Skeleton loader for calculator pages (EMI, fuel cost, price breakup)
export default function CalculatorSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          {/* Sliders / Inputs */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between mb-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full" />
            </div>
          ))}
          {/* CTA */}
          <div className="h-12 w-full bg-gray-200 rounded-lg mt-4" />
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-28 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
