// Skeleton loader for news article / content pages
export default function ArticleSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex gap-2 mb-6">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="h-9 w-full bg-gray-200 rounded mb-3" />
        <div className="h-9 w-3/4 bg-gray-200 rounded mb-6" />

        {/* Meta */}
        <div className="flex gap-4 mb-6">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        {/* Hero Image */}
        <div className="aspect-video bg-gray-200 rounded-xl mb-8" />

        {/* Article Body */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
          <div className="h-6 w-64 bg-gray-200 rounded mt-8 mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
