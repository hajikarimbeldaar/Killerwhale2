// Skeleton loader for review / form pages
export default function ReviewSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="h-8 w-56 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-80 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Star Rating */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>
          {/* Form Fields */}
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded-lg" />
            </div>
          ))}
          {/* Textarea */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded-lg" />
          </div>
          {/* Submit */}
          <div className="h-12 w-full bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
