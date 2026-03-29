import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import PageSection from '@/components/common/PageSection'
import Footer from '@/components/Footer'
import Ad3DCarousel from '@/components/ads/Ad3DCarousel'
import ElectricCarsClient from './ElectricCarsClient'
import Breadcrumb from '@/components/common/Breadcrumb'
import CarExpertBanner from '@/components/CarExpertBanner'
import { resolveR2Url } from '@/lib/image-utils'

export const revalidate = 172800 // 48 hours — data updates weekly

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Electric Cars in India ${new Date().getFullYear()} - Prices, Range & Specs | gadizone`,
        description: `Explore all electric cars in India ${new Date().getFullYear()} with detailed prices, range, specifications and reviews. Compare EVs from Tesla, Tata, Mahindra, Hyundai, BYD and more.`,
        keywords: `electric cars India, EV cars, electric vehicles, EV range, zero emission cars, best electric cars ${new Date().getFullYear()}`,
        openGraph: {
            title: `Electric Cars in India ${new Date().getFullYear()}`,
            description: `Explore all electric cars in India ${new Date().getFullYear()} with detailed prices, range and specifications.`,
            type: 'website'
        },
        alternates: {
            canonical: `/electric-cars`
        }
    }
}

// Helper function to format launch date
const formatLaunchDate = (date: string): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const parts = date.split('-')
    if (parts.length === 2) {
        const year = parts[0]
        const monthIndex = parseInt(parts[1]) - 1
        return `${months[monthIndex]} ${year}`
    }
    return date
}

// Server-side data fetching
async function getElectricCarsData() {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'

    try {
        const [modelsRes, brandsRes] = await Promise.all([
            fetch(`${backendUrl}/api/models-with-pricing?limit=50`, { next: { revalidate: 172800 } }),
            fetch(`${backendUrl}/api/brands`, { next: { revalidate: 172800 } })
        ])

        const modelsResponse = await modelsRes.json()
        const brands = await brandsRes.json()

        const models = modelsResponse.data || modelsResponse

        // Create brand map
        const brandMap = brands.reduce((acc: any, brand: any) => {
            acc[brand.id] = brand.name
            return acc
        }, {})

        // Process all cars
        const allCars = models.map((model: any) => {
            const lowestPrice = model.lowestPrice || model.price || 0
            const fuelTypes = model.fuelTypes && model.fuelTypes.length > 0 ? model.fuelTypes : ['Petrol']
            const transmissions = model.transmissionTypes && model.transmissionTypes.length > 0 ? model.transmissionTypes : ['Manual']
            const heroImage = resolveR2Url(model.heroImage)

            return {
                id: model.id,
                name: model.name,
                brand: model.brandId,
                brandName: brandMap[model.brandId] || 'Unknown',
                image: heroImage,
                startingPrice: lowestPrice,
                lowestPriceFuelType: model.lowestPriceFuelType || fuelTypes[0],
                fuelTypes,
                transmissions,
                bodyType: model.bodyType,
                seating: model.seating || 5,
                launchDate: model.launchDate ? `Launched ${formatLaunchDate(model.launchDate)}` : 'Launched',
                slug: `${(brandMap[model.brandId] || '').toLowerCase().replace(/\s+/g, '-')}-${model.name.toLowerCase().replace(/\s+/g, '-')}`,
                isNew: model.isNew || false,
                isPopular: model.isPopular || false,
                rating: 4.5,
                reviews: 1247,
                variants: model.variantCount || 0
            }
        })

        // Filter only electric cars
        const electricCars = allCars.filter((car: any) =>
            car.fuelTypes && car.fuelTypes.some((f: string) => f.toLowerCase() === 'electric')
        )

        const popularCars = electricCars.filter((c: any) => c.isPopular).slice(0, 10)
        const newLaunchedCars = electricCars.filter((c: any) => c.isNew).slice(0, 10)

        // Generate dynamic description based on actual car data
        const sortedCars = [...electricCars].sort((a: any, b: any) => (a.startingPrice || 0) - (b.startingPrice || 0))
        const topCars = sortedCars.slice(0, 5)
        const carCount = electricCars.length
        const currentYear = new Date().getFullYear()

        let shortDesc = `Thinking of going electric? Explore our comprehensive collection of ${carCount}+ electric cars available in India ${currentYear}, featuring the latest EVs with impressive range, fast charging, and zero emissions.`

        // Create rich HTML-like content
        const extendedDesc = `
            <div class="prose prose-sm max-w-none text-gray-700">
                <h2 class="text-lg font-bold text-gray-900 mt-4 mb-2">Why Buy an Electric Car in ${currentYear}?</h2>
                <p>Electric vehicles (EVs) are the future of mobility in India. With rising fuel prices and government incentives, buying an EV has never been more attractive. Leading manufacturers like Tata, MG, Hyundai, and BYD offer a wide range of options from affordable city cars to luxury SUVs.</p>
                
                <h3 class="text-base font-semibold text-gray-900 mt-3 mb-1">Key Benefits:</h3>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Low Running Cost:</strong> Just ₹1-1.5 per km compared to ₹8-10 for petrol cars.</li>
                    <li><strong>Smooth Drive:</strong> Instant torque and silent operation for a premium driving experience.</li>
                    <li><strong>Zero Emissions:</strong> Contribute to a cleaner, greener environment.</li>
                    <li><strong>Government Subsidies:</strong> Tax benefits and incentives in many states.</li>
                </ul>

                <h2 class="text-lg font-bold text-gray-900 mt-4 mb-2">Top 5 Electric Cars in India ${currentYear}</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-left text-sm whitespace-nowrap">
                        <thead class="uppercase tracking-wider border-b-2 border-emerald-200 bg-emerald-50">
                            <tr>
                                <th scope="col" class="px-4 py-2 text-emerald-900 font-semibold">Model</th>
                                <th scope="col" class="px-4 py-2 text-emerald-900 font-semibold text-right">Price (Ex-Showroom)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-emerald-100">
                            ${topCars.map((car: any) => `
                                <tr>
                                    <td class="px-4 py-2 font-medium text-gray-900">${car.brandName} ${car.name}</td>
                                    <td class="px-4 py-2 text-gray-600 text-right">₹ ${(car.startingPrice / 100000).toFixed(2)} Lakh*</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <p class="text-xs text-gray-500 mt-2 italic">*Prices are subject to change. Check specific model pages for accurate on-road prices.</p>
            </div>
        `

        const dynamicDescription = JSON.stringify({ short: shortDesc, extended: extendedDesc })

        return { cars: electricCars, popularCars, newLaunchedCars, dynamicDescription }
    } catch (error) {
        console.error('Error fetching electric cars data:', error)
        return { cars: [], popularCars: [], newLaunchedCars: [], dynamicDescription: '' }
    }
}

export default async function ElectricCarsPage() {
    const { cars, popularCars, newLaunchedCars, dynamicDescription } = await getElectricCarsData()

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <main>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Ad3DCarousel className="my-4" />
                    </div>

                    {/* Header & Filters */}
                    <PageSection background="white">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to Home
                        </Link>

                        <ElectricCarsClient
                            initialCars={cars}
                            popularCars={popularCars}
                            newLaunchedCars={newLaunchedCars}
                            dynamicDescription={dynamicDescription || ''}
                        />
                    </PageSection>

                    {/* Car Expert Banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <CarExpertBanner
                            title="Confused which electric car to choose?"
                            subtitle="Our experts help you find the best EV for your needs - range, charging, and budget"
                            feature1="EV Guide"
                            feature2="Range Help"
                            feature3="Charging Tips"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Ad3DCarousel className="my-4" />
                    </div>
                </main>
            </div>
            <Breadcrumb items={[{ label: 'Electric Cars' }]} />
            <Footer />
        </>
    )
}
