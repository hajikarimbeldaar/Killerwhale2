import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1.5 group transition-all">
              <div className="relative w-6 h-6 rounded-md overflow-hidden bg-white flex-shrink-0 shadow-sm ring-1 ring-white/10 flex items-center justify-center p-0.5 translate-y-[0.5px]">
                <Image
                  src="/logo.png?v=1.0.7"
                  alt="Gadizone Logo"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-orange-300 transition-all pb-1">gadizone</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for finding the perfect new car in India. Compare prices,
              specifications, reviews, and get the best deals from authorized dealers.
            </p>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/car-expert" title="gadizone Car Buying Expert" aria-label="gadizone Car Buying Expert" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">
                  Car Buying Expert
                </Link>
              </li>
              <li>
                <Link href="/top-selling-cars-in-india" title="New Cars in India" aria-label="Explore New Cars in India" className="text-gray-300 hover:text-red-400 transition-colors">
                  New Cars
                </Link>
              </li>
              <li>
                <Link href="/compare" title="Compare Cars in India" aria-label="Compare Cars Tool" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Compare Cars
                </Link>
              </li>
              <li>
                <Link href="/electric-cars" title="Electric Cars in India" aria-label="Find Electric Cars" className="text-gray-300 hover:text-red-400 transition-colors">
                  Electric Cars
                </Link>
              </li>
              <li>
                <Link href="/emi-calculator" title="Car Loan EMI Calculator" aria-label="Calculate Car EMI" className="text-gray-300 hover:text-orange-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/news" title="Latest Car News in India" aria-label="Read Car News" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Car News
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Brands</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/maruti-suzuki-cars" title="Maruti Suzuki Cars" aria-label="Browse Maruti Suzuki Cars" className="text-gray-300 hover:text-red-400 transition-colors">
                  Maruti Suzuki
                </Link>
              </li>
              <li>
                <Link href="/hyundai-cars" title="Hyundai Cars" aria-label="Browse Hyundai Cars" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Hyundai
                </Link>
              </li>
              <li>
                <Link href="/tata-cars" title="Tata Cars" aria-label="Browse Tata Cars" className="text-gray-300 hover:text-red-400 transition-colors">
                  Tata
                </Link>
              </li>
              <li>
                <Link href="/mahindra-cars" title="Mahindra Cars" aria-label="Browse Mahindra Cars" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Mahindra
                </Link>
              </li>
              <li>
                <Link href="/kia-cars" title="Kia Cars" aria-label="Browse Kia Cars" className="text-gray-300 hover:text-red-400 transition-colors">
                  Kia
                </Link>
              </li>
              <li>
                <Link href="/toyota-cars" title="Toyota Cars" aria-label="Browse Toyota Cars" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Toyota
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400" />
                <a href="mailto:Karim0beldaar@gmail.com" className="text-gray-300 hover:text-red-400 transition-colors">
                  Karim0beldaar@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <a href="tel:+919945210466" className="text-gray-300 hover:text-orange-400 transition-colors">
                  +91 99452 10466
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
                <span className="text-gray-300">
                  Mumbai, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} gadizone. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about-us" className="text-gray-400 hover:text-orange-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact-us" className="text-gray-400 hover:text-red-400 transition-colors">
                Contact
              </Link>
              <Link href="/feedback" className="text-gray-400 hover:text-orange-400 transition-colors">
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}
