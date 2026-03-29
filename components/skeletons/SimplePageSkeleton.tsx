// Skeleton loader for simple content pages (about, contact, privacy, etc.)
export default function SimplePageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-9 w-64 bg-gray-200 rounded mb-6" />
        <div className="space-y-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`h-4 bg-gray-200 rounded`} style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
