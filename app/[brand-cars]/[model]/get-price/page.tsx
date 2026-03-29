import PriceBreakupPage from '@/components/price-breakup/PriceBreakupPage'

export const revalidate = 172800 // 48 hours — data updates weekly

interface GetPricePageProps {
  params: Promise<{
    'brand-cars': string
    model: string
  }>
}

import { getPriceBreakupData } from '../price-in/[city]/page'
import { generateCarProductSchema } from '@/lib/structured-data'


export default async function GetPricePage({ params }: GetPricePageProps) {
  const resolvedParams = await params

  // Extract brand from "honda-cars" -> "honda"
  const brandSlug = resolvedParams['brand-cars'].replace('-cars', '')
  const modelSlug = resolvedParams.model

  // Default city is Mumbai
  const citySlug = 'mumbai'

  // Fetch initial data server-side for SSR
  const initialData = await getPriceBreakupData(brandSlug, modelSlug, citySlug)

  // Generate structured data for Price Page
  const currentUrl = `https://www.gadizone.com/${brandSlug}-cars/${modelSlug}/get-price`
  const productSchema = initialData ? generateCarProductSchema({
    name: `${initialData.brand.name} ${initialData.model.name}`,
    brand: initialData.brand.name,
    image: initialData.model.heroImage,
    url: currentUrl,
    description: `Get ${initialData.brand.name} ${initialData.model.name} on-road price in Mumbai. View price breakup, variants, and specs.`,
    lowPrice: initialData.variants.length > 0 ? Math.min(...initialData.variants.map((v: any) => v.price)) : 0,
    highPrice: initialData.variants.length > 0 ? Math.max(...initialData.variants.map((v: any) => v.price)) : 0,
    bodyType: initialData.model.bodyType,
    fuelType: initialData.model.fuelTypes?.[0] || 'Petrol',
    transmission: initialData.model.transmissions?.[0] || 'Manual',
    seatingCapacity: initialData.model.seating ? parseInt(initialData.model.seating.split(' ')[0]) : 5,
    modelDate: new Date().getFullYear().toString(),
    rating: initialData.model.rating,
    reviewCount: initialData.model.reviewCount,
  }) : null

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <PriceBreakupPage
        brandSlug={brandSlug}
        modelSlug={modelSlug}
        citySlug={citySlug}
        initialBrand={initialData?.brand}
        initialModel={initialData?.model}
        initialVariants={initialData?.variants}
        initialSimilarCars={initialData?.similarCars}
        initialPopularCars={initialData?.popularCars}
      />

    </>
  )
}
