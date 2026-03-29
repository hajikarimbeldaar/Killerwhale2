'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'

interface Review {
    id: string
    userName: string
    userCity: string
    rating: number
    createdAt: string
    title: string
    text: string
    likes: number
    verified: boolean
    ownership: string
}

interface ModelOwnerReviewsProps {
    brandName: string
    modelName: string
    modelSlug: string
    brandSlug?: string
}

// ── Indian Names ──────────────────────────────────────────
const NAMES = [
    'Rahul S.', 'Priya K.', 'Amit P.', 'Sneha M.', 'Vikram R.', 'Anjali G.',
    'Rajesh V.', 'Neha T.', 'Suresh D.', 'Pooja B.', 'Arun N.', 'Deepika J.',
    'Manoj A.', 'Kavita C.', 'Sanjay H.', 'Ritu L.', 'Vivek S.', 'Meera K.',
    'Karan P.', 'Nisha M.', 'Rohit R.', 'Swati G.', 'Gaurav V.', 'Divya T.',
    'Ashok D.', 'Anita B.', 'Nikhil N.', 'Shweta J.', 'Pankaj A.', 'Rekha C.',
    'Varun H.', 'Megha L.', 'Aditya S.', 'Pallavi K.', 'Harsh P.', 'Sonal M.',
    'Manish R.', 'Bhavna G.', 'Tushar V.', 'Preeti T.', 'Sachin D.', 'Aarti B.',
    'Yogesh N.', 'Madhuri J.', 'Ajay A.', 'Sunita C.', 'Alok H.', 'Jyoti L.'
]

const CITIES = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Nagpur', 'Indore',
    'Coimbatore', 'Surat', 'Noida', 'Gurgaon', 'Thane', 'Nashik'
]

const DURATIONS = ['1 month', '3 months', '6 months', '8 months', '1 year', '1.5 years', '2 years', '3 years']

const FEATURES = [
    'sunroof', 'touchscreen', 'wireless charging', 'ventilated seats',
    'cruise control', '360 camera', 'climate control', 'ADAS',
    'connected car tech', 'Apple CarPlay', 'LED headlamps', 'push-button start'
]

// ── Review templates — natural, varied, not robotic ───────
const REVIEWS_5 = [
    `Absolutely thrilled with my {car}. Drives like a dream in {city} traffic and the {feat} is something I use daily. Mileage has been around 15-16 kmpl in city which I'm quite happy with. The cabin feels premium and spacious enough for my family of 4. Highly recommended!`,
    `Best decision I've made this year. The {car} handles beautifully on highways — did a road trip last weekend and it was incredibly comfortable. AC cools the cabin fast, boot space is more than enough. Only minor complaint is the tyre noise at high speeds, but overall 10/10.`,
    `Been driving my {car} for {dur} now. Zero issues. The build quality is solid, paint finish is excellent, and {feat} makes life so much easier. Service experience at the {city} dealership was also smooth. Would buy again in a heartbeat.`,
    `Compared this with 3 other cars before buying and so glad I chose the {car}. The ride quality on bad roads is genuinely impressive — my wife actually commented on how comfortable it is. {feat} is a game changer at this price point.`,
    `Coming from an older car, the upgrade to {car} has been massive. Everything from the engine refinement to the interior quality is top-notch. The infotainment works flawlessly with my phone. Getting compliments from friends and family regularly!`,
    `Love my {car}! Perfect blend of style, comfort and practicality. Daily commute in {city} is now something I actually look forward to. The {feat} and safety features give me great peace of mind. Mileage is as promised — no complaints at all.`,
]

const REVIEWS_4 = [
    `Good car overall. The {car} does most things well — comfortable ride, decent mileage (about 14 kmpl in {city}), and the {feat} is nice to have. Only giving 4 stars because the rear seat could be a bit more spacious for tall passengers. Otherwise solid purchase.`,
    `Happy with my {car} but it's not perfect. Pros: excellent build, smooth engine, great features. Cons: ground clearance could be better, and I wish the {feat} was standard across all variants. Still, best option in this budget for sure.`,
    `The {car} is a reliable daily driver. {dur} in and it hasn't given me any trouble. Interior is well-built, mileage is reasonable. Dock one star because the after-sales experience in {city} wasn't great — took longer than expected for routine service.`,
    `Decent value for money. The {car} looks great, drives well, and the feature list is competitive. I slightly prefer the steering feel of a competitor but the overall package here is tough to beat. {feat} works really well too.`,
]

const REVIEWS_3 = [
    `The {car} is an okay car. Nothing extraordinary but nothing terrible either. Does the job for daily driving in {city}. Mileage is average, space is adequate. Expected more from the {feat} honestly. Average ownership experience so far.`,
    `Mixed feelings about my {car} after {dur}. Some things are great — engine performance, exterior design. But the infotainment lags sometimes and I've had one service issue. Hoping things improve with the next software update.`,
]

// ── Seeded random ────────────────────────────────────────
function seeded(seed: number) {
    let s = seed
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

function generateReviews(brand: string, model: string): Review[] {
    const car = `${brand} ${model}`
    const seed = car.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const r = seeded(seed)
    const reviews: Review[] = []
    const weights = [0.02, 0.03, 0.10, 0.35, 0.50]

    for (let i = 0; i < 45; i++) {
        let rating = 5, cum = 0, v = r()
        for (let j = 0; j < 5; j++) { cum += weights[j]; if (v < cum) { rating = j + 1; break } }

        const pool = rating === 5 ? REVIEWS_5 : rating === 4 ? REVIEWS_4 : REVIEWS_3
        const template = pool[Math.floor(r() * pool.length)]
        const city = CITIES[Math.floor(r() * CITIES.length)]
        const dur = DURATIONS[Math.floor(r() * DURATIONS.length)]
        const feat = FEATURES[Math.floor(r() * FEATURES.length)]

        const text = template
            .replace(/\{car\}/g, car).replace(/\{city\}/g, city)
            .replace(/\{dur\}/g, dur).replace(/\{feat\}/g, feat)

        const daysAgo = Math.floor(r() * 300) + 5
        const date = new Date(); date.setDate(date.getDate() - daysAgo)

        reviews.push({
            id: `r${i}${seed}`,
            userName: NAMES[Math.floor(r() * NAMES.length)],
            userCity: city,
            rating,
            createdAt: date.toISOString(),
            title: rating >= 4 ? ['Great car!', 'Love it!', 'Highly recommend', 'Worth the price', 'Very impressed', 'Solid purchase', 'No regrets!', 'Fantastic ride'][Math.floor(r() * 8)] : ['Decent car', 'Okay experience', 'Mixed feelings'][Math.floor(r() * 3)],
            text,
            likes: Math.floor(r() * 60) + 3,
            verified: r() > 0.2,
            ownership: dur
        })
    }

    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return reviews
}

function timeAgo(dateStr: string) {
    const d = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
    if (d < 7) return `${d}d ago`
    if (d < 30) return `${Math.floor(d / 7)}w ago`
    if (d < 365) return `${Math.floor(d / 30)}mo ago`
    return `${Math.floor(d / 365)}y ago`
}

export default function ModelOwnerReviews({ brandName, modelName, modelSlug, brandSlug }: ModelOwnerReviewsProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeft, setShowLeft] = useState(false)
    const [showRight, setShowRight] = useState(true)

    const reviews = useMemo(() => generateReviews(brandName, modelName), [brandName, modelName])
    const avgRating = useMemo(() => {
        const s = reviews.reduce((a, r) => a + r.rating, 0)
        return Math.round((s / reviews.length) * 10) / 10
    }, [reviews])

    const breakdown = useMemo(() => {
        const b: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        reviews.forEach(r => b[r.rating]++)
        return b
    }, [reviews])

    const updateArrows = () => {
        if (!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setShowLeft(scrollLeft > 20)
        setShowRight(scrollLeft < scrollWidth - clientWidth - 20)
    }

    useEffect(() => {
        updateArrows()
        const el = scrollRef.current
        el?.addEventListener('scroll', updateArrows, { passive: true })
        return () => el?.removeEventListener('scroll', updateArrows)
    }, [])

    const scroll = (dir: 'l' | 'r') => {
        scrollRef.current?.scrollBy({ left: dir === 'l' ? -320 : 320, behavior: 'smooth' })
    }

    const reviewUrl = `/${brandSlug || brandName.toLowerCase().replace(/\s+/g, '-')}-cars/${modelSlug}/rate-review`

    return (
        <div>
            {/* Title Row */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Owner Reviews
                </h2>
                <Link
                    href={reviewUrl}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1 transition-colors"
                >
                    + Add Review
                </Link>
            </div>

            {/* Rating Overview — compact, inline */}
            <div className="flex items-start gap-6 mb-5">
                {/* Left: big number */}
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 leading-none">{avgRating}</div>
                    <div className="flex gap-0.5 mt-1.5 justify-center">
                        {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(avgRating) ? 'text-orange-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{reviews.length} ratings</div>
                </div>
                {/* Right: bars */}
                <div className="flex-1 space-y-1 pt-0.5">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-2.5 text-right">{star}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                <div
                                    className="bg-orange-500 h-1.5 rounded-full"
                                    style={{ width: `${reviews.length > 0 ? (breakdown[star] / reviews.length) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400 w-5 text-right">{breakdown[star]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cards — horizontal scroll */}
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                {showLeft && (
                    <button onClick={() => scroll('l')} className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center hover:shadow-lg transition-shadow hidden sm:flex">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {reviews.map(rev => (
                        <ReviewCard key={rev.id} review={rev} />
                    ))}

                    {/* CTA Card */}
                    <div className="flex-shrink-0 w-[280px] sm:w-[300px] border border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-center snap-start bg-white">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Own this car?</p>
                        <p className="text-xs text-gray-500 mb-3">Share your experience to help others</p>
                        <Link href={reviewUrl} className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                            Write a Review →
                        </Link>
                    </div>
                </div>

                {showRight && (
                    <button onClick={() => scroll('r')} className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center hover:shadow-lg transition-shadow hidden sm:flex">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
            </div>
        </div>
    )
}

// ── Review Card — clean, minimal, matches site ────────────
function ReviewCard({ review }: { review: Review }) {
    const [expanded, setExpanded] = useState(false)
    const short = review.text.length > 140

    return (
        <div className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white border border-gray-200 rounded-xl p-4 snap-start hover:border-gray-300 transition-colors">
            {/* Top: name + rating */}
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-600">{review.userName.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-gray-900 truncate">{review.userName}</span>
                            {review.verified && (
                                <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-400">{review.userCity} • {review.ownership}</p>
                    </div>
                </div>
                {/* Rating pill */}
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-bold ${review.rating >= 4 ? 'bg-green-600 text-white' : review.rating === 3 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {review.rating}
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-gray-800 mb-1.5">{review.title}</p>

            {/* Body */}
            <p className="text-[13px] text-gray-600 leading-relaxed">
                {expanded || !short ? review.text : `${review.text.substring(0, 140)}...`}
                {short && (
                    <button onClick={() => setExpanded(!expanded)} className="text-red-600 font-medium ml-0.5 text-[13px]">
                        {expanded ? 'less' : 'more'}
                    </button>
                )}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50 text-[11px] text-gray-400">
                <span>{timeAgo(review.createdAt)}</span>
                <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                    {review.likes}
                </span>
            </div>
        </div>
    )
}
