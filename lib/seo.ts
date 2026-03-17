import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export function generateSEO({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg',
  canonical
}: SEOConfig): Metadata {
  const siteName = 'gadizone'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gadizone.com'

  return {
    title: fullTitle,
    description,
    keywords: keywords || `${title}, car prices, car reviews, car specifications, gadizone`,
    authors: [{ name: 'gadizone' }],
    creator: 'gadizone',
    publisher: 'gadizone',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonical ? (canonical.startsWith('http') ? canonical : `${baseUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`) : undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || baseUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@gadizone',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Google verification is set in layout.tsx
    },
  }
}

// Brand-specific SEO
export function generateBrandSEO(brandName: string): Metadata {
  const currentYear = new Date().getFullYear();
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  return generateSEO({
    title: `${brandName} Cars in India ${currentYear} — Prices, Models & Expert Reviews`,
    description: `Explore all ${brandName} cars available in India in ${currentYear}. Compare ex-showroom and on-road prices, read honest expert reviews, check mileage figures, and find the right ${brandName} for your budget and lifestyle.`,
    keywords: `${brandName} cars India, ${brandName} car price ${currentYear}, ${brandName} models list, ${brandName} on road price, best ${brandName} car, ${brandName} variants, ${brandName} mileage, ${brandName} review India`,
    canonical: `/${brandSlug}-cars`,
  })
}

// Model-specific SEO — with optional price data for CTR-optimized titles
export function generateModelSEO(
  brandName: string,
  modelName: string,
  options?: {
    startingPrice?: number    // in rupees (e.g., 1087000)
    endingPrice?: number
    variantCount?: number
    bodyType?: string
    fuelTypes?: string[]
  }
): Metadata {
  const currentYear = new Date().getFullYear();
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = modelName.toLowerCase().replace(/\s+/g, '-');

  // Format prices for titles (₹10.87 Lakh format)
  const formatLakhPrice = (price: number) => {
    if (price <= 0) return ''
    const lakh = price / 100000
    return lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh.toFixed(2)} Lakh`
  }

  // Build price string for title
  let priceStr = ''
  if (options?.startingPrice && options.startingPrice > 0) {
    const startStr = formatLakhPrice(options.startingPrice)
    if (options?.endingPrice && options.endingPrice > options.startingPrice) {
      const endStr = formatLakhPrice(options.endingPrice)
      priceStr = ` ${startStr} - ${endStr}`
    } else {
      priceStr = ` ${startStr} Onwards`
    }
  }

  // CTR-optimized title with price (Google shows ~60 chars)
  const title = priceStr
    ? `${brandName} ${modelName} Price${priceStr} (${currentYear}) — Variants, Mileage`
    : `${brandName} ${modelName} Price in India ${currentYear} — Variants, Mileage & Review`

  // Rich description with price for Google snippet
  const variantInfo = options?.variantCount ? `Available in ${options.variantCount} variants. ` : ''
  const fuelInfo = options?.fuelTypes?.length ? `${options.fuelTypes.join(', ')} options. ` : ''
  const priceInfo = priceStr ? `Price starts at ${formatLakhPrice(options!.startingPrice!)} ex-showroom. ` : ''

  const description = `${brandName} ${modelName} ${currentYear}${priceStr ? ` price starts at ${formatLakhPrice(options!.startingPrice!)}` : ' price'}. ${variantInfo}${fuelInfo}${priceInfo}Compare all variants, check real-world mileage, read expert reviews. On-road price, EMI, specs & features.`

  return generateSEO({
    title,
    description,
    keywords: `${brandName} ${modelName} price ${currentYear}, ${modelName} on road price, ${modelName} variants, ${modelName} mileage, ${modelName} review, ${modelName} specs, ${modelName} EMI, ${modelName} vs competitors, best ${options?.bodyType || 'car'} India`,
    canonical: `/${brandSlug}-cars/${modelSlug}`,
  })
}

// Variant-specific SEO
export function generateVariantSEO(brandName: string, modelName: string, variantName: string): Metadata {
  const currentYear = new Date().getFullYear();
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = modelName.toLowerCase().replace(/\s+/g, '-');
  const variantSlug = variantName.toLowerCase().replace(/\s+/g, '-');
  return generateSEO({
    title: `${brandName} ${modelName} ${variantName} — On Road Price, Features & Full Specs (${currentYear})`,
    description: `${brandName} ${modelName} ${variantName} on road price, detailed features list, fuel efficiency, and full specifications for ${currentYear}. Find out exactly what you get in the ${variantName} trim and whether it's worth the premium over lower variants.`,
    keywords: `${brandName} ${modelName} ${variantName} price, ${brandName} ${modelName} ${variantName} on road price, ${brandName} ${modelName} ${variantName} features, ${brandName} ${modelName} ${variantName} mileage, ${brandName} ${modelName} ${variantName} specs ${currentYear}`,
    canonical: `/${brandSlug}-cars/${modelSlug}/${variantSlug}`,
  })
}

// Static page SEO
export const staticPageSEO = {
  home: generateSEO({
    title: `New Cars in India ${new Date().getFullYear()} — Compare Prices, Specs & Expert Reviews`,
    description: `Looking for a new car in India? Compare prices, variants, mileage, and expert reviews for ${new Date().getFullYear()} models from Maruti Suzuki, Hyundai, Tata, Mahindra, and more. No dealer bias — just honest research.`,
    keywords: `new cars India ${new Date().getFullYear()}, car prices India, best cars to buy, car comparison, car reviews India, Maruti Suzuki cars, Hyundai cars, Tata cars, car EMI calculator, on road price`,
    canonical: '/',
  }),

  emiCalculator: generateSEO({
    title: 'Car EMI Calculator - Calculate Monthly Car Loan EMI',
    description: 'Calculate your car loan EMI with our advanced EMI calculator. Get instant results with detailed amortization schedule, interest breakdown, and compare different loan options.',
    keywords: 'car EMI calculator, car loan calculator, EMI calculation, car finance, auto loan calculator, monthly EMI',
    canonical: '/emi-calculator',
  }),

  priceBreakup: generateSEO({
    title: 'Car Price Breakup - On-Road Price Calculator',
    description: 'Calculate on-road price of any car with detailed price breakup including ex-showroom price, RTO charges, road tax, insurance, and accessories. Get accurate pricing for your city.',
    keywords: 'car price breakup, on-road price calculator, car price calculator, RTO charges, road tax calculator, car insurance',
    canonical: '/price-breakup',
  }),

  compare: generateSEO({
    title: 'Compare Cars - Side by Side Car Comparison',
    description: 'Compare cars side by side with detailed specifications, features, prices, and expert reviews. Make an informed decision with our comprehensive car comparison tool.',
    keywords: 'compare cars, car comparison, side by side comparison, car specs comparison, car features comparison',
    canonical: '/compare',
  }),

  news: generateSEO({
    title: 'Car News - Latest Automotive News & Updates',
    description: 'Stay updated with latest car news, launches, reviews, and automotive industry updates. Get expert insights and analysis on new cars, technology, and trends.',
    keywords: 'car news, automotive news, car launches, car reviews, auto industry news, latest cars',
    canonical: '/news',
  }),

  offers: generateSEO({
    title: 'Car Offers & Deals - Best Car Discounts in India',
    description: 'Discover the best car offers, discounts, and deals in India. Get exclusive offers on new cars, exchange bonuses, and festive discounts from authorized dealers.',
    keywords: 'car offers, car discounts, car deals, car exchange offers, festive car offers, car promotions',
    canonical: '/offers',
  }),

  location: generateSEO({
    title: 'Select Your City - Car Prices by City',
    description: 'Select your city to get accurate on-road car prices, dealer information, and local offers. We cover all major cities across India.',
    keywords: 'car prices by city, on-road price, city-wise car prices, car dealers by city',
    canonical: '/location',
  }),

  search: generateSEO({
    title: 'Search Cars - Find Your Perfect Car',
    description: 'Search and find your perfect car from thousands of models. Filter by price, brand, fuel type, body type, and more. Get detailed information and compare cars.',
    keywords: 'search cars, find cars, car search, car finder, search by price, search by brand',
    canonical: '/search',
  }),
}
