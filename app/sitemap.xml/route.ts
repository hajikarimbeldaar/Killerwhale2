import { NextRequest } from 'next/server'
import { BACKEND_URL } from '@/lib/config'

// Cache for 24 hours — prevents repeated backend calls when Googlebot hits the index repeatedly.
export const revalidate = 86400

const BASE_URL = 'https://www.gadizone.com'
const EXTERNAL_API_URL = BACKEND_URL

// Must match the chunk size in /sitemap/[id]/route.ts
const MODELS_PER_CHUNK = 3

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
        console.error(`Sitemap index fetch error for ${endpoint}:`, error)
        return []
    }
}

export async function GET(request: NextRequest) {
    // Fetch brands and models in parallel to determine valid chunk count
    const [modelsResponse, brandsResponse] = await Promise.all([
        fetchData('/api/models?limit=5000'),
        fetchData('/api/brands'),
    ])

    const modelsData = modelsResponse?.data || modelsResponse
    const rawModels = Array.isArray(modelsData) ? modelsData : []

    const brandsData = brandsResponse?.data || brandsResponse
    const brands = Array.isArray(brandsData) ? brandsData : []
    const brandMap = new Map(brands.map((b: { id: string; name: string }) => [b.id, b.name]))

    // ✅ Filter to valid models before counting chunks — prevents empty sitemaps being indexed
    const validModels = rawModels.filter((model: { name: string; brandId: string; brandName: string }) => {
        const brandName = model.brandName || brandMap.get(model.brandId)
        return brandName && model.name
    })

    const numChunks = Math.ceil(validModels.length / MODELS_PER_CHUNK)

    // Build Sitemap Index XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap/main.xml</loc>
  </sitemap>`

    for (let i = 0; i < numChunks; i++) {
        xml += `
  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
  </sitemap>`
    }

    xml += `
</sitemapindex>`

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    })
}
