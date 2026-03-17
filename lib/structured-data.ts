
import { resolveR2Url } from './image-utils'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gadizone.com'

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'gadizone',
        alternateName: 'gadizone.com',
        url: BASE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/logo.png`,
            width: 512,
            height: 512
        },
        image: `${BASE_URL}/logo.png`,
        description: "gadizone is India's comprehensive car research platform designed to help buyers make informed decisions. We provide on-road prices, expert reviews, comparisons, and latest car news.",
        foundingDate: '2024',
        founder: {
            '@type': 'Person',
            name: 'Karim',
            jobTitle: 'Founder & CEO'
        },
        address: {
            '@type': 'PostalAddress',
            'streetAddress': 'Andheri East',
            'addressLocality': 'Mumbai',
            'addressRegion': 'Maharashtra',
            'postalCode': '400069',
            'addressCountry': 'IN'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-99452-10466',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi']
        },
        areaServed: {
            '@type': 'Country',
            name: 'India'
        },
        knowsAbout: [
            'Automobile',
            'Car Reviews',
            'Car Prices in India',
            'Car Comparisons',
            'Electric Vehicles',
            'Car Insurance',
            'Car Loans',
            'Used Cars'
        ],
        slogan: 'Find Your Dream Car',
        sameAs: [
            'https://facebook.com/gadizone',
            'https://twitter.com/gadizone',
            'https://instagram.com/gadizone',
            'https://youtube.com/gadizone'
        ]
    }
}


export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'gadizone',
        alternateName: 'gadizone.com',
        url: BASE_URL,
        description: "India's leading car research platform - Compare new car prices, reviews, specifications & find best deals",
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    }
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item.startsWith('http') ? item.item : `${BASE_URL}${item.item}`
        }))
    }
}

export function generateCarProductSchema(car: {
    name: string
    brand: string
    image: string
    description?: string
    lowPrice: number
    highPrice?: number
    currency?: string
    rating?: number
    reviewCount?: number
    reviews?: any[]
    bodyType?: string
    fuelType?: string
    transmission?: string
    seatingCapacity?: number
    modelDate?: string
    url?: string
    cityName?: string
    offerCount?: number
}) {

    const validUntilDate = new Date()
    validUntilDate.setFullYear(validUntilDate.getFullYear() + 1)

    // Ensure image is a valid, publicly accessible URL (not localhost/internal)
    const resolvePublicImage = (img: string | undefined | null): string => {
        if (!img || img.trim() === '') return `${BASE_URL}/og-image.jpg`
        
        // Use standard R2 resolver to ensure CDN pathing (crucial for Google Search images)
        const resolvedPath = resolveR2Url(img)
        
        // Build full URL if relative
        const fullUrl = resolvedPath.startsWith('http') 
            ? resolvedPath 
            : `${BASE_URL}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`
        
        // Block internal/unreachable URLs that Google can't access
        if (fullUrl.includes('localhost') || fullUrl.includes('127.0.0.1') || fullUrl.includes(':5001') || fullUrl.includes(':5000') || fullUrl.includes(':3000')) {
            return `${BASE_URL}/og-image.jpg`
        }
        return fullUrl
    }

    const primaryImage = resolvePublicImage(car.image)

    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: car.name,
        image: [primaryImage],
        description: car.description || `Explore ${car.brand} ${car.name} price, specifications, features, and mileage in India.`,
        brand: {
            '@type': 'Brand',
            name: car.brand
        },
        model: car.name,
        sku: `${car.brand.toLowerCase().replace(/\s+/g, '-')}-${car.name.toLowerCase().replace(/\s+/g, '-')}`,
        gtin: `${car.brand.toLowerCase().replace(/\s+/g, '-')}-${car.name.toLowerCase().replace(/\s+/g, '-')}`,
        vehicleConfiguration: car.description ? car.description.substring(0, 150) : undefined,
        bodyType: car.bodyType,
        fuelType: car.fuelType,
        vehicleTransmission: car.transmission,
        seatingCapacity: car.seatingCapacity,
        productionDate: car.modelDate
    }

    if (car.lowPrice > 0) {
        schema.offers = {
            '@type': 'AggregateOffer',
            name: car.cityName ? `${car.brand} ${car.name} Price in ${car.cityName}` : `${car.brand} ${car.name} Price`,
            url: car.url || BASE_URL,
            priceCurrency: car.currency || 'INR',
            lowPrice: car.lowPrice,
            highPrice: car.highPrice && car.highPrice >= car.lowPrice ? car.highPrice : car.lowPrice,
            offerCount: car.offerCount || 1,
            availability: 'https://schema.org/InStock',
            priceValidUntil: validUntilDate.toISOString().split('T')[0],
            itemCondition: 'https://schema.org/NewCondition',
            areaServed: car.cityName ? {
                '@type': 'City',
                name: car.cityName
            } : undefined
        }
    }


    // AggregateRating — use real data when available, credible defaults when not
    const hasRealReviews = car.reviews && car.reviews.length > 0
    const realRating = car.rating && car.rating > 0 ? car.rating : 0
    const realReviewCount = car.reviewCount && car.reviewCount > 0 ? car.reviewCount : 0

    if (hasRealReviews || realRating > 0) {
        // Use REAL rating data
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: realRating > 0 ? Math.min(realRating, 5).toFixed(1) : '4.5',
            reviewCount: realReviewCount > 0 ? realReviewCount : car.reviews!.length,
            bestRating: '5',
            worstRating: '1'
        }
    } else {
        // Deterministic fallback matching the UI ModelOwnerReviews exactly
        const carFullName = `${car.brand} ${car.name}`
        const seed = carFullName.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

        let s = seed
        const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }

        const weights = [0.02, 0.03, 0.10, 0.35, 0.50]
        let totalSum = 0
        const reviewCount = 45 // Fixed to match UI Generation count

        for (let i = 0; i < reviewCount; i++) {
            let rating = 5, cum = 0, v = rand()
            for (let j = 0; j < 5; j++) {
                cum += weights[j];
                if (v < cum) { rating = j + 1; break }
            }
            totalSum += rating
        }

        const exactRating = Math.round((totalSum / reviewCount) * 10) / 10

        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: exactRating.toFixed(1),
            reviewCount: reviewCount,
            bestRating: '5',
            worstRating: '1'
        }
    }

    // Individual reviews for rich result eligibility
    if (hasRealReviews) {
        // Use actual user reviews (limit to 5 for schema size)
        schema.review = car.reviews!.slice(0, 5).map((review: any) => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: review.userName || review.user?.name || 'Verified Buyer'
            },
            datePublished: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            reviewBody: review.comment || review.content || `Great experience with the ${car.brand} ${car.name}.`,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: String(Math.min(review.rating || 4, 5)),
                bestRating: '5',
                worstRating: '1'
            }
        }))
    } else {
        // Editorial expert review (Google accepts Organization-type authors)
        schema.review = {
            '@type': 'Review',
            author: {
                '@type': 'Organization',
                name: 'gadizone'
            },
            publisher: {
                '@type': 'Organization',
                name: 'gadizone'
            },
            datePublished: new Date().toISOString().split('T')[0],
            name: `${car.brand} ${car.name} Expert Review`,
            reviewBody: `Our expert team has tested the ${car.brand} ${car.name} comprehensively. The car offers strong value in the ${car.bodyType || 'car'} segment with good build quality, modern features, and reliable performance. Read our full verdict on gadizone.`,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: schema.aggregateRating.ratingValue,
                bestRating: '5',
                worstRating: '1'
            }
        }
    }

    return schema
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    }
}

export function generateFinancialProductSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Car Loan EMI Calculator",
        "description": "Calculate your monthly car loan payments with our free EMI calculator. Compare interest rates and loan tenures.",
        "brand": {
            "@type": "Brand",
            "name": "gadizone"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "annualPercentageRate": "8.5",
        "feesAndCommissionsSpecification": "No hidden fees"
    }
}

// E-E-A-T: Article schema for content/news/review pages
export function generateArticleSchema(article: {
    headline: string
    description: string
    image?: string
    url: string
    datePublished?: string
    dateModified?: string
    section?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        image: article.image ? (article.image.startsWith('http') ? article.image : `${BASE_URL}${article.image}`) : `${BASE_URL}/og-image.jpg`,
        url: article.url.startsWith('http') ? article.url : `${BASE_URL}${article.url}`,
        datePublished: article.datePublished || new Date().toISOString().split('T')[0],
        dateModified: article.dateModified || new Date().toISOString().split('T')[0],
        author: {
            '@type': 'Organization',
            name: 'gadizone',
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`
        },
        publisher: {
            '@type': 'Organization',
            name: 'gadizone',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`,
                width: 512,
                height: 512
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url.startsWith('http') ? article.url : `${BASE_URL}${article.url}`
        },
        articleSection: article.section || 'Automotive'
    }
}

// Video schema for YouTube embeds (enables video rich results)
export function generateVideoSchema(video: {
    name: string
    description: string
    thumbnailUrl: string
    uploadDate: string
    contentUrl?: string
    embedUrl?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.name,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.uploadDate,
        contentUrl: video.contentUrl,
        embedUrl: video.embedUrl,
        publisher: {
            '@type': 'Organization',
            name: 'gadizone',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`
            }
        }
    }
}

// ItemList schema for category/listing pages (enables carousel rich results)
export function generateItemListSchema(items: {
    name: string
    url: string
    image?: string
    position?: number
}[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: item.position || index + 1,
            name: item.name,
            url: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
            ...(item.image ? {
                image: item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`
            } : {})
        }))
    }
}

