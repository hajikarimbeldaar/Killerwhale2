import { NextRequest } from 'next/server'
import { BACKEND_URL } from '@/lib/config'
import { CITY_DATABASE } from '@/lib/city-database'

// Cache each sitemap chunk for 1 hour on Vercel's edge.
// Without this, Google hitting all 17 chunks simultaneously would make 34+ backend
// API calls at once (/api/models?limit=5000 × 17), overwhelming the server and causing timeouts.
export const revalidate = 3600

const BASE_URL = 'https://www.gadizone.com'
const EXTERNAL_API_URL = BACKEND_URL

// Tier 1: Cities where popular === true (~105 verified metros across all of India)
// Tier 2 & 3: ALL other cities from the SAME major states (district HQs, growing towns etc.)
//
// Strategy: Find which states have at least one popular city, then include EVERY city
// from those states. This gives us organic Tier 2+3 coverage (Nashik, Aligarh, Anand, Sikar,
// Dewas, Karimnagar, Nellore, Palakkad, Moga, Bhilwara etc.) without including tiny
// hamlets from fringe states that have no search traffic.
//
// Result: ~919 cities covering Tier 1, 2 and 3 from all major Indian states.
const MAJOR_STATES = new Set(
    CITY_DATABASE
        .filter(city => city.popular === true)
        .map(city => city.state)
)
const TIER_1_2_3_CITIES = CITY_DATABASE.filter(city => MAJOR_STATES.has(city.state))

const MODELS_PER_CHUNK = 3

// PHASE 4 REMINDER: To add remaining Tier 4/5 cities from smaller states later,
// create dedicated sub-sitemaps once your current pages gain impressions (3-4 months):
//   /sitemap-cities-assam.xml     → CITY_DATABASE.filter(c => c.state === 'Assam')
//   /sitemap-cities-odisha.xml    → CITY_DATABASE.filter(c => c.state === 'Odisha')
//   Submit these to Google Search Console as your domain authority grows.


async function fetchData(endpoint: string, cacheTime = 3600) {
    try {
        const url = `${EXTERNAL_API_URL}${endpoint}`
        const res = await fetch(url, {
            next: { revalidate: cacheTime },
            headers: { 'User-Agent': 'Gadizone/1.0 SitemapGenerator' }
        })
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`)
        return await res.json()
    } catch (error) {
        console.error(`Sitemap fetch error for ${endpoint}:`, error)
        return []
    }
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;'
            case '>': return '&gt;'
            case '&': return '&amp;'
            case '\'': return '&apos;'
            case '"': return '&quot;'
        }
        return c
    })
}

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const idParam = params.id
    const id = idParam.replace('.xml', '')

    let routes: { url: string; lastModified?: Date; priority?: number; changefreq?: string }[] = []

    if (id === 'main') {
        const now = new Date()
        const coreRoutes = [
            { url: `${BASE_URL}/`, priority: 1.0, lastModified: now, changefreq: 'daily' },
            { url: `${BASE_URL}/car-expert`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/new-cars`, priority: 0.9, lastModified: now, changefreq: 'daily' },
            { url: `${BASE_URL}/news`, priority: 0.9, lastModified: now, changefreq: 'daily' },
            { url: `${BASE_URL}/compare`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/electric-cars`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/upcoming-cars-in-india`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/top-selling-cars-in-india`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/popular-cars-in-india`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/new-car-launches-in-india`, priority: 0.9, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/emi-calculator`, priority: 0.8, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/car-loan-emi-calculator`, priority: 0.8, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/fuel-cost-calculator`, priority: 0.8, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/sell-car`, priority: 0.8, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/location`, priority: 0.8, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/best-cars-under-8-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-10-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-15-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-20-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-25-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-30-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-40-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-50-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-60-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-80-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/best-cars-under-1-crore-lakh`, priority: 0.8, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/reviews`, priority: 0.7, lastModified: now, changefreq: 'weekly' },
            { url: `${BASE_URL}/about-us`, priority: 0.5, lastModified: now, changefreq: 'monthly' },
            { url: `${BASE_URL}/contact-us`, priority: 0.5, lastModified: now, changefreq: 'monthly' },
        ]

        // Fetch brands & news in parallel
        const [brandsResponse, newsResponse] = await Promise.all([
            fetchData('/api/brands'),
            fetchData('/api/news?limit=100'),
        ])

        const brandsData = brandsResponse?.data || brandsResponse
        const brands = Array.isArray(brandsData) ? brandsData : []
        const activeBrands = brands.filter((brand: { status: string; name: string }) => brand.status === 'active' && brand.name)

        const brandRoutes = activeBrands.map((brand: { name: string }) => ({
            url: `${BASE_URL}/${brand.name.toLowerCase().replace(/\s+/g, '-')}-cars`,
            priority: 0.9,
        }))

        const articlesData = newsResponse?.articles || newsResponse?.data || newsResponse
        const articles = Array.isArray(articlesData) ? articlesData : []
        const newsRoutes = articles
            .filter((a: { slug: string }) => a.slug)
            .map((article: { slug: string; publishedAt?: string }) => ({
                url: `${BASE_URL}/news/${article.slug}`,
                lastModified: article.publishedAt ? new Date(article.publishedAt) : undefined,
                priority: 0.7,
            }))

        routes = [...coreRoutes, ...brandRoutes, ...newsRoutes]

    } else {
        const chunkIndex = parseInt(id)
        if (!isNaN(chunkIndex)) {
            // Fetch brands and models in parallel
            const [modelsResponse, brandsResponse] = await Promise.all([
                fetchData('/api/models?limit=5000'),
                fetchData('/api/brands'),
            ])

            const modelsData = modelsResponse?.data || modelsResponse
            const rawModels = Array.isArray(modelsData) ? modelsData : []

            const brandsData = brandsResponse?.data || brandsResponse
            const brands = Array.isArray(brandsData) ? brandsData : []
            const brandMap = new Map(brands.map((b: { id: string; name: string }) => [b.id, b.name]))

            // ✅ FIX 1: Filter BEFORE chunking to prevent empty sitemap chunks
            const validModels = rawModels.filter((model: { name: string; brandId: string; brandName: string }) => {
                const brandName = model.brandName || brandMap.get(model.brandId)
                return brandName && model.name
            })

            const start = chunkIndex * MODELS_PER_CHUNK
            const end = start + MODELS_PER_CHUNK
            const chunkModels = validModels.slice(start, end)

            chunkModels.forEach((model: { name: string; brandId: string; brandName: string; updatedAt?: string }) => {
                const brandName = model.brandName || brandMap.get(model.brandId)
                const brandSlug = (brandName as string).toLowerCase().replace(/\s+/g, '-')
                const modelSlug = model.name.toLowerCase().replace(/\s+/g, '-')
                const basePath = `${BASE_URL}/${brandSlug}-cars/${modelSlug}`
                const lastMod = model.updatedAt ? new Date(model.updatedAt) : undefined

                // 1. Main Model Page
                routes.push({ url: basePath, lastModified: lastMod, priority: 0.8 })

                // 2. Sub-pages
                const subPages = ['images', 'reviews', 'colors', 'mileage', 'variants']
                subPages.forEach(sub => {
                    routes.push({ url: `${basePath}/${sub}`, lastModified: lastMod, priority: 0.6 })
                })

                // 3. Price URLs for Tier 1-2-3 Cities (Matches GSC Success state: 2,775 URLs)
                TIER_1_2_3_CITIES.forEach(city => {
                    const citySlug = city.city.toLowerCase().replace(/\s+/g, '-')
                    routes.push({
                        url: `${basePath}/price-in-${citySlug}`,
                        lastModified: lastMod,
                        priority: city.popular ? 0.7 : 0.5
                    })
                })
            })
        }
    }

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    routes.forEach(route => {
        xml += `
  <url>
    <loc>${escapeXml(route.url)}</loc>`
        if (route.lastModified) {
            xml += `
    <lastmod>${route.lastModified.toISOString()}</lastmod>`
        }
        if ((route as any).changefreq) {
            xml += `
    <changefreq>${(route as any).changefreq}</changefreq>`
        }
        if (route.priority !== undefined) {
            xml += `
    <priority>${route.priority}</priority>`
        }
        xml += `
  </url>`
    })

    xml += `
</urlset>`

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    })
}
