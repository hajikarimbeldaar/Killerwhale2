import Link from 'next/link'
import { Car, Search, Home } from 'lucide-react'

export const runtime = 'nodejs'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-red-600">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-10">
            Sorry, we couldn't find the page you're looking for. The vehicle may have been discontinued, or the URL might have changed.
          </p>
        </div>

        {/* Quick Links for Lost Users / SEO Crawlers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-left">Popular Searches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link href="/hyundai-cars" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-white border hover:border-red-500 rounded-xl hover:text-red-600 transition-all group shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                <Car className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
              </div>
              <span className="font-medium">Hyundai Cars</span>
            </Link>
            <Link href="/tata-cars" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-white border hover:border-red-500 rounded-xl hover:text-red-600 transition-all group shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                <Car className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
              </div>
              <span className="font-medium">Tata Cars</span>
            </Link>
            <Link href="/maruti-suzuki-cars" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-white border hover:border-red-500 rounded-xl hover:text-red-600 transition-all group shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                <Car className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
              </div>
              <span className="font-medium">Maruti Suzuki</span>
            </Link>
            <Link href="/new-cars" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-white border hover:border-red-500 rounded-xl hover:text-red-600 transition-all group shadow-sm hover:shadow-md">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                <Search className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
              </div>
              <span className="font-medium">Explore All New Cars</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
