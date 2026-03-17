import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.gadizone.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/login',
                    '/signup',
                    '/forgot-password',
                    '/reset-password',
                    '/verify-email',
                    '/debug-env',
                    '/test-honda',
                    '/search',       // Search results pages
                    '/ai-search',
                    '/ai-car-finder',
                    '/variants/',    // Legacy variant route (now flat: /brand/model/variant-slug)
                    '*/variant/*',   // Legacy /variant/ subdirectory URLs (301 → flat URL)
                    '*/price-in/*',  // Legacy /price-in/ subdirectory URLs (301 → flat URL)
                ],
            },
            // Block AI Scrapers (Content Protection)
            {
                userAgent: ['GPTBot', 'Google-Extended', 'ClaudeBot', 'Amazonbot', 'Applebot-Extended'],
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
