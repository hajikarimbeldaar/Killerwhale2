'use client'

import { useState } from 'react'
import { Search, Menu } from 'lucide-react'
import LocationHeader from './LocationHeader'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - gadizone Logo */}
          <a href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
            <Image
              src="/logo.png?v=1.0.1"
              alt="Gadizone Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <span className="text-2xl font-black tracking-tight" style={{ color: '#3141a5' }}>gadizone</span>
          </a>

          {/* Right side - Search, Location, Menu */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="h-6 w-6 text-gray-600" />
            </button>

            {/* Location Icon */}
            <LocationHeader />

            {/* Menu Burger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (if needed) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                New Cars
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Used Cars
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Reviews
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                News
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
