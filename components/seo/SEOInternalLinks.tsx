import Link from 'next/link'

interface SEOInternalLinksProps {
    brandSlug: string
    modelSlug: string
    brandName: string
    modelName: string
    similarCars?: Array<{
        brandName: string
        name: string
        startingPrice?: number
    }>
}

// Top Indian cities for internal linking (sorted by search volume)
const TOP_CITIES = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Indore', 'Nagpur', 'Coimbatore', 'Kochi',
    'Bhopal', 'Patna', 'Surat', 'Vadodara', 'Visakhapatnam'
]

const formatPrice = (price: number) => {
    if (!price || price <= 0) return ''
    const lakh = price / 100000
    return lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh.toFixed(2)} Lakh`
}

export default function SEOInternalLinks({
    brandSlug,
    modelSlug,
    brandName,
    modelName,
    similarCars = []
}: SEOInternalLinksProps) {
    return (
        <div className="bg-white border-t border-gray-200 py-8 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

                {/* Price in Popular Cities */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        {brandName} {modelName} Price in Popular Cities
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 text-[15px]">
                        {TOP_CITIES.map(city => {
                            const citySlug = city.toLowerCase().replace(/\s+/g, '-')
                            return (
                                <li key={city}>
                                    <Link
                                        href={`/${brandSlug}-cars/${modelSlug}/price-in-${citySlug}`}
                                        className="text-gray-600 hover:text-red-600 transition-colors block"
                                    >
                                        {modelName} Price in {city}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                {/* Similar Cars / Competitors */}
                {similarCars.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                            {modelName} Alternatives & Competitors
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 text-[15px]">
                            {similarCars.slice(0, 8).map((car, index) => {
                                const carBrandSlug = car.brandName.toLowerCase().replace(/\s+/g, '-')
                                const carModelSlug = car.name.toLowerCase().replace(/\s+/g, '-')
                                return (
                                    <li key={index} className="border-b border-gray-100">
                                        <Link
                                            href={`/${carBrandSlug}-cars/${carModelSlug}`}
                                            className="text-gray-700 hover:text-red-600 flex items-center justify-between transition-colors group py-3.5"
                                        >
                                            <span className="font-medium group-hover:text-red-600">{car.brandName} {car.name}</span>
                                            {car.startingPrice && (
                                                <span className="text-gray-500 font-medium">
                                                    {formatPrice(car.startingPrice)}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}

                {/* Compare With Competitors */}
                {similarCars.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                            Compare {brandName} {modelName} With
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 text-[15px]">
                            {similarCars.slice(0, 8).map((car, index) => {
                                const carBrandSlug = car.brandName.toLowerCase().replace(/\s+/g, '-')
                                const carModelSlug = car.name.toLowerCase().replace(/\s+/g, '-')
                                return (
                                    <li key={index}>
                                        <Link
                                            href={`/compare/${brandSlug}-${modelSlug}-vs-${carBrandSlug}-${carModelSlug}`}
                                            className="text-gray-600 hover:text-red-600 transition-colors block"
                                        >
                                            {modelName} vs {car.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}

                {/* Used Cars / Cross Linking */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        Interested in Used {brandName} {modelName}?
                    </h2>
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
                        <li>
                            <Link href={`/used-cars/${brandSlug}-cars`} className="text-gray-600 hover:text-red-600 transition-colors">
                                Used {brandName} Cars
                            </Link>
                        </li>
                        <li>
                            <Link href={`/used-cars/${brandSlug}-cars/${modelSlug}`} className="text-gray-600 hover:text-red-600 transition-colors">
                                Used {brandName} {modelName}
                            </Link>
                        </li>
                    </ul>
                </section>

                {/* Quick Explore Links */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        Explore {brandName} {modelName}
                    </h2>
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
                        <li>
                            <Link href={`/${brandSlug}-cars/${modelSlug}/variants`} className="text-gray-600 hover:text-red-600 transition-colors">
                                All {modelName} Variants
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${brandSlug}-cars/${modelSlug}/images`} className="text-gray-600 hover:text-red-600 transition-colors">
                                {modelName} Images
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${brandSlug}-cars/${modelSlug}#faqs`} className="text-gray-600 hover:text-red-600 transition-colors">
                                {modelName} FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href="/emi-calculator" className="text-gray-600 hover:text-red-600 transition-colors">
                                EMI Calculator
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
