import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VariantPage from '@/components/variant/VariantPage'
import PriceBreakupPage from '@/components/price-breakup/PriceBreakupPage'
import { generateVariantSEO } from '@/lib/seo'
import { generateCarProductSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structured-data'
import { FloatingAIBot } from '@/components/FloatingAIBot'
import { getPriceBreakupData } from '../price-in/[city]/page'
import { resolveR2Url } from '@/lib/image-utils'
import { getCurrentMonthYear } from '@/lib/date-utils'

interface PageProps {
  params: Promise<{
    'brand-cars': string
    model: string
    variant: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Enable ISR with 1-hour revalidation for caching
export const revalidate = 86400 // 24 hours — saves Vercel CPU

// City mapping for display (used by price-in pages)
const cityMap: { [key: string]: string } = {
  'mumbai': 'Mumbai, Maharashtra',
  'delhi': 'Delhi, NCR',
  'bangalore': 'Bangalore, Karnataka',
  'bengaluru': 'Bangalore, Karnataka',
  'chennai': 'Chennai, Tamil Nadu',
  'hyderabad': 'Hyderabad, Telangana',
  'pune': 'Pune, Maharashtra',
  'kolkata': 'Kolkata, West Bengal',
  'ahmedabad': 'Ahmedabad, Gujarat',
  'jaipur': 'Jaipur, Rajasthan',
  'lucknow': 'Lucknow, Uttar Pradesh',
  'chandigarh': 'Chandigarh, Punjab',
  'kochi': 'Kochi, Kerala',
  'indore': 'Indore, Madhya Pradesh'
}

const toDisplayName = (slug?: string) => {
  if (!slug) return '';
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const brandSlug = resolvedParams['brand-cars'].replace('-cars', '')
  const modelSlug = resolvedParams.model
  const variantSlug = resolvedParams.variant

  // --- PRICE-IN PAGE METADATA ---
  if (variantSlug.startsWith('price-in-')) {
    const citySlug = variantSlug.replace('price-in-', '')
    const brandName = toDisplayName(brandSlug)
    const modelName = toDisplayName(modelSlug)
    const cityName = cityMap[citySlug?.toLowerCase() || '']?.split(',')[0] || toDisplayName(citySlug)
    const monthYear = getCurrentMonthYear()

    // Fetch price + image data for CTR-optimized title
    let modelImage = 'https://www.gadizone.com/og-image.jpg'
    let priceStr = ''
    let lowestPrice = 0
    try {
      const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
      const [brandsRes, modelsRes] = await Promise.all([
        fetch(`${backendUrl}/api/brands`, { next: { revalidate: 86400 } }),
        fetch(`${backendUrl}/api/models-with-pricing?limit=20`, { next: { revalidate: 86400 } }),
      ])
      if (brandsRes.ok && modelsRes.ok) {
        const brands = await brandsRes.json()
        const modelsData = (await modelsRes.json())?.data || []
        const brand = brands.find((b: any) =>
          b.name.toLowerCase() === brandSlug.toLowerCase().replace(/-/g, ' ') ||
          b.name.toLowerCase().replace(/\s+/g, '-') === brandSlug.toLowerCase()
        )
        if (brand) {
          const model = modelsData.find((m: any) =>
            m.brandId === brand.id && (
              m.name.toLowerCase() === modelSlug.toLowerCase().replace(/-/g, ' ') ||
              m.name.toLowerCase().replace(/\s+/g, '-') === modelSlug.toLowerCase()
            )
          )
          if (model) {
            if (model.heroImage) {
              modelImage = resolveR2Url(model.heroImage)
            }
            lowestPrice = model.lowestPrice || model.price || 0
            if (lowestPrice > 0) {
              const lakh = lowestPrice / 100000
              priceStr = lakh >= 100 ? ` ₹${(lakh / 100).toFixed(2)} Cr` : ` ₹${lakh.toFixed(2)} Lakh`
            }
          }
        }
      }
    } catch (e) {
      console.error('Error fetching price data for meta:', e)
    }

    // CTR-optimized title with price + city + month/year
    const title = priceStr
      ? `${brandName} ${modelName} Price in ${cityName}${priceStr} - On Road Price (${monthYear})`
      : `${brandName} ${modelName} Price in ${cityName} - On Road Price, EMI, Variants (${monthYear})`
    const description = `${brandName} ${modelName} on-road price in ${cityName}${priceStr ? ` starts at${priceStr}` : ''}. Check detailed price breakup including ex-showroom, RTO, insurance. Calculate EMI and compare all variants in ${cityName} (${monthYear}).`

    return {
      title,
      description,
      keywords: `${brandName} ${modelName} price ${cityName} ${monthYear}, ${modelName} on road price ${cityName}, ${modelName} variants`,
      openGraph: {
        title,
        description,
        type: 'website',
        url: `/${resolvedParams['brand-cars']}/${modelSlug}/${variantSlug}`,
        images: [{ url: modelImage, width: 1200, height: 630, alt: `${brandName} ${modelName} Price in ${cityName}` }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [modelImage],
      },
      alternates: {
        canonical: `/${resolvedParams['brand-cars']}/${modelSlug}/${variantSlug}`,
      },
    }
  }

  // --- VARIANT PAGE METADATA ---
  const brandName = toDisplayName(brandSlug)
  const modelName = toDisplayName(modelSlug)
  const variantName = toDisplayName(variantSlug)

  let price = 0
  try {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    
    // Fetch brands to find brand ID, then model ID, then variants
    const [brandsRes, modelsRes] = await Promise.all([
      fetch(`${backendUrl}/api/brands`, { next: { revalidate: 86400 } }),
      fetch(`${backendUrl}/api/models-with-pricing?limit=20`, { next: { revalidate: 86400 } }),
    ])

    if (brandsRes.ok && modelsRes.ok) {
      const brands = await brandsRes.json()
      const modelsData = (await modelsRes.json())?.data || []
      const brand = brands.find((b: any) =>
        b.name.toLowerCase() === brandSlug.toLowerCase().replace(/-/g, ' ') ||
        b.name.toLowerCase().replace(/\s+/g, '-') === brandSlug.toLowerCase()
      )
      
      if (brand) {
        const model = modelsData.find((m: any) =>
          m.brandId === brand.id && (
            m.name.toLowerCase() === modelSlug.toLowerCase().replace(/-/g, ' ') ||
            m.name.toLowerCase().replace(/\s+/g, '-') === modelSlug.toLowerCase()
          )
        )
        
        if (model) {
          const variantsRes = await fetch(`${backendUrl}/api/variants?modelId=${model.id}`, { next: { revalidate: 86400 } })
          if (variantsRes.ok) {
            const variants = await variantsRes.json()
            const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            const target = normalize(variantSlug)
            const variantEntry = variants.find((v: any) => normalize(v.name) === target)
            if (variantEntry) price = variantEntry.price
          }
        }
      }
    }
  } catch (e) {
    console.error('Error fetching data for variant metadata:', e)
  }

  return generateVariantSEO(brandName, modelName, variantName, price)
}

export default async function VariantDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const brandSlug = resolvedParams['brand-cars'].replace('-cars', '')
  const modelSlug = resolvedParams.model
  const variantSlug = resolvedParams.variant

  // --- PRICE-IN PAGE: Render directly (CarWale/CarDekho style — single flat URL) ---
  if (variantSlug.startsWith('price-in-')) {
    const citySlug = variantSlug.replace('price-in-', '')
    const initialData = await getPriceBreakupData(brandSlug, modelSlug, citySlug)

    // Generate structured data
    const cityName = cityMap[citySlug?.toLowerCase() || '']?.split(',')[0] || toDisplayName(citySlug)
    const currentUrl = `https://www.gadizone.com/${resolvedParams['brand-cars']}/${modelSlug}/${variantSlug}`
    const productSchema = initialData ? generateCarProductSchema({
      name: `${initialData.brand.name} ${initialData.model.name}`,
      brand: initialData.brand.name,
      image: initialData.model.heroImage,
      url: currentUrl,
      description: `Get the detailed on-road price of ${initialData.brand.name} ${initialData.model.name} in ${cityName}. Our comprehensive price breakup includes ex-showroom price, RTO charges, insurance, and other taxes. Calculate your monthly EMI and compare variants of the ${initialData.model.name} easily on gadizone.`,
      lowPrice: initialData.variants.length > 0 ? Math.min(...initialData.variants.map((v: any) => v.price)) : 0,
      highPrice: initialData.variants.length > 0 ? Math.max(...initialData.variants.map((v: any) => v.price)) : 0,
      bodyType: initialData.model.bodyType,
      fuelType: initialData.model.fuelTypes?.[0] || 'Petrol',
      transmission: initialData.model.transmissions?.[0] || 'Manual',
      seatingCapacity: initialData.model.seating ? parseInt(initialData.model.seating.split(' ')[0]) : 5,
      modelDate: new Date().getFullYear().toString(),
      cityName: cityName,
      offerCount: initialData.variants.length || 1,
      rating: initialData.model.rating,
      reviewCount: initialData.model.reviewCount,
    }) : null


    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: `${initialData?.brand?.name || brandSlug} Cars`, item: `/${brandSlug}-cars` },
      { name: initialData?.model?.name || modelSlug, item: `/${brandSlug}-cars/${modelSlug}` },
      { name: `Price in ${toDisplayName(citySlug)}`, item: `/${resolvedParams['brand-cars']}/${modelSlug}/${variantSlug}` },
    ])

    // Auto-generate city-specific FAQs for rich snippets  
    const cityDisplayName = toDisplayName(citySlug)
    const brandDisplayName = initialData?.brand?.name || toDisplayName(brandSlug)
    const modelDisplayName = initialData?.model?.name || toDisplayName(modelSlug)
    const year = new Date().getFullYear()
    const lowestVariantPrice = initialData?.variants && initialData.variants.length > 0
      ? Math.min(...initialData.variants.map((v: any) => v.price))
      : 0
    const priceDisplay = lowestVariantPrice > 0
      ? `₹${(lowestVariantPrice / 100000).toFixed(2)} Lakh`
      : 'competitive pricing'

    const cityFaqs = [
      {
        question: `What is the on-road price of ${brandDisplayName} ${modelDisplayName} in ${cityDisplayName}?`,
        answer: `The on-road price of ${brandDisplayName} ${modelDisplayName} in ${cityDisplayName} starts at approximately ${priceDisplay} including ex-showroom price, RTO charges, insurance, and other fees. The exact on-road price depends on the variant you choose.`
      },
      {
        question: `What are the RTO charges for ${brandDisplayName} ${modelDisplayName} in ${cityDisplayName}?`,
        answer: `RTO charges for ${brandDisplayName} ${modelDisplayName} in ${cityDisplayName} vary based on the ex-showroom price and state government regulations. Typically, RTO charges range from 5-12% of the ex-showroom price. Use our on-road price calculator for exact charges.`
      },
      {
        question: `How to calculate EMI for ${brandDisplayName} ${modelDisplayName} in ${cityDisplayName}?`,
        answer: `You can calculate the EMI for ${brandDisplayName} ${modelDisplayName} using our EMI calculator. Enter the on-road price, down payment amount, loan tenure (typically 3-7 years), and interest rate to get your monthly EMI. Most banks offer car loans at 8-10% interest rate.`
      },
      {
        question: `Which ${brandDisplayName} ${modelDisplayName} variant offers best value in ${year}?`,
        answer: `The best value variant of ${brandDisplayName} ${modelDisplayName} depends on your needs. The base variant offers essential features at the lowest price, while mid variants provide the best balance of features and price. Top variants add premium features like sunroof, advanced safety, and premium audio.`
      },
      {
        question: `Is ${brandDisplayName} ${modelDisplayName} available in ${cityDisplayName}?`,
        answer: `Yes, the ${brandDisplayName} ${modelDisplayName} is available at authorized ${brandDisplayName} dealerships in ${cityDisplayName}. You can book a test drive or get a quote from your nearest dealer. The delivery timeline may vary based on variant and color availability.`
      }
    ]

    const cityFaqSchema = generateFAQSchema(cityFaqs)

    return (
      <>
        {productSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityFaqSchema) }} />
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
        <FloatingAIBot type="price" id={modelSlug} name={modelSlug} hasStickyBottomBar={true} />
      </>
    )
  }

  // Convert slugs to display names
  const brandName = brandSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const modelName = modelSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const variantName = variantSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  // Fetch real data from backend
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'

    // Fetch brands to get brand ID
    const brandsRes = await fetch(`${backendUrl}/api/brands`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    const brands = await brandsRes.json()

    // Normalize slug for matching (same logic as model page)
    const normalizeBrandSlug = (name: string) =>
      name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const brand = brands.find((b: any) =>
      normalizeBrandSlug(b.name) === brandSlug
    )

    if (!brand) {
      notFound()
    }

    // Fetch models for this brand
    const modelsRes = await fetch(`${backendUrl}/api/models?brandId=${brand.id}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    const models = await modelsRes.json()
    const model = models.find((m: any) =>
      m.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === modelSlug
    )

    if (!model) {
      notFound()
    }

    // Fetch variants for this model
    const variantsRes = await fetch(`${backendUrl}/api/variants?modelId=${model.id}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    const variants = await variantsRes.json()

    // Find the specific variant
    const normalizeForMatch = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const normalizedVariantSlug = normalizeForMatch(variantSlug)

    let variant = variants.find((v: any) =>
      normalizeForMatch(v.name) === normalizedVariantSlug
    )

    if (!variant && variants.length > 0) {
      // Try partial matching
      variant = variants.find((v: any) =>
        normalizeForMatch(v.name).includes(normalizedVariantSlug) ||
        normalizedVariantSlug.includes(normalizeForMatch(v.name))
      )
    }

    if (!variant) {
      variant = variants[0] // Fallback to first variant
    }

    // Calculate model's starting price from variants
    const variantPrices = variants.map((v: any) => v.price).filter((p: number) => p > 0)
    const modelStartingPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : 0

    // Fetch similar cars — limit=20 is enough to find 6 similar cars (was 500, very wasteful)
    const similarModelsRes = await fetch(
      `${backendUrl}/api/models-with-pricing?limit=20`,
      { next: { revalidate: 86400 } }
    ).then(res => res.json()).catch(() => [])

    const similarModelsData = similarModelsRes?.data || similarModelsRes || []

    const brandMap = brands.reduce((acc: any, brand: any) => {
      acc[brand.id] = brand.name
      return acc
    }, {})

    // Process Similar Cars (Server-Side) - EXACT LOGIC FROM CarsYouMightLike
    const currentPrice = modelStartingPrice || model.price || 0
    const currentBodyType = (model.bodyType || '').toLowerCase()

    // Set price range limits (+/- 40%)
    const minPrice = currentPrice * 0.6
    const maxPrice = currentPrice * 1.4

    // First try: Match by body type AND price range
    let filteredCars = similarModelsData.filter((m: any) => {
      if (m.id === model.id) return false

      const price = m.lowestPrice || m.price || 0
      if (price <= 100000) return false

      const matchesBodyType = currentBodyType && m.bodyType &&
        m.bodyType.toLowerCase() === currentBodyType

      const inPriceRange = currentPrice <= 0 || (price >= minPrice && price <= maxPrice)

      return matchesBodyType && inPriceRange
    })

    // Second try: If less than 3 matches, try just body type
    if (filteredCars.length < 3 && currentBodyType) {
      filteredCars = similarModelsData.filter((m: any) => {
        if (m.id === model.id) return false
        const price = m.lowestPrice || m.price || 0
        if (price <= 100000) return false
        return m.bodyType && m.bodyType.toLowerCase() === currentBodyType
      })
    }

    // Third try: If still less than 3 matches, show popular cars
    if (filteredCars.length < 3) {
      filteredCars = similarModelsData.filter((m: any) => {
        if (m.id === model.id) return false
        const price = m.lowestPrice || m.price || 0
        return price > 100000
      })
    }

    // Sort by popularity then by price proximity
    filteredCars.sort((a: any, b: any) => {
      if (a.isPopular && !b.isPopular) return -1
      if (!a.isPopular && b.isPopular) return 1

      if (currentPrice > 0) {
        const aPrice = a.lowestPrice || a.price || 0
        const bPrice = b.lowestPrice || b.price || 0
        const aDiff = Math.abs(aPrice - currentPrice)
        const bDiff = Math.abs(bPrice - currentPrice)
        return aDiff - bDiff
      }
      return 0
    })

    const similarCars = filteredCars
      .slice(0, 6)
      .map((m: any) => {
        const lowestPrice = m.lowestPrice || m.price || 0
        const fuelTypes = m.fuelTypes && m.fuelTypes.length > 0
          ? m.fuelTypes
          : ['Petrol']
        const transmissions = m.transmissions && m.transmissions.length > 0
          ? m.transmissions
          : ['Manual']

        return {
          id: m.id,
          brandName: brandMap[m.brandId] || 'Unknown',
          name: m.name,
          image: m.heroImage || m.image,
          startingPrice: lowestPrice,
          fuelTypes,
          transmissions,
          launchDate: m.launchDate,
          isNew: m.isNew || false,
          isPopular: m.isPopular || false
        }
      })

    // Add similar cars and starting price to model object
    const modelWithSimilarCars = {
      ...model,
      startingPrice: modelStartingPrice,
      similarCars
    }

    // Generate JSON-LD Schema
    const productSchema = generateCarProductSchema({
      name: `${brandName} ${modelName} ${variantName}`,
      brand: brandName,
      image: resolveR2Url(variant?.highlightImages?.[0]?.url || model.heroImage),
      description: variant?.description || variant?.headerSummary || `Full specifications and features of ${brandName} ${modelName} ${variantName}.`,
      lowPrice: variant?.price || modelStartingPrice,
      highPrice: variant?.price || modelStartingPrice,
      currency: 'INR',
      rating: variant?.rating || 0,
      reviewCount: variant?.reviewCount || 0
    })

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: brandName, item: `/${brandSlug}-cars` },
      { name: modelName, item: `/${brandSlug}-cars/${modelSlug}` },
      { name: variantName, item: `/${brandSlug}-cars/${modelSlug}/${variantSlug}` }
    ])

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <VariantPage
          brandName={brandName}
          modelName={modelName}
          variantName={variantName}
          initialBrand={brand}
          initialModel={modelWithSimilarCars}
          initialVariant={variant}
          initialAllVariants={variants}
        />
        <FloatingAIBot type="variant" id={variant?.id || variantSlug} name={variant?.name || variantName} />
      </>
    )
  } catch (error) {
    console.error('Error fetching variant data:', error)

    // Return with empty data on error
    return (
      <>
        <VariantPage
          brandName={brandName}
          modelName={modelName}
          variantName={variantName}
        />
        <FloatingAIBot type="variant" id={variantSlug} name={variantName} />
      </>
    )
  }
}
