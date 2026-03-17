'use client'

import React, { useMemo } from 'react'

interface CitySEOContentProps {
    brandName: string
    modelName: string
    cityName: string
    bodyType?: string
    transmissions?: string[]
    fuelTypes?: string[]
}

// Helper to determine city traits for localized content
const getCityTraits = (city: string) => {
    const c = city.toLowerCase()
    if (c.includes('mumbai')) {
        return {
            traffic: "notorious stop-and-go traffic from BKC to Andheri",
            roads: "monsoon-affected roads",
            vibe: "the bustling streets of South Bombay to the suburbs",
            state: "Maharashtra",
            climate: "heavy rains and humid coastal weather"
        }
    }
    if (c.includes('delhi') || c.includes('ncr')) {
        return {
            traffic: "heavy peak-hour gridlocks on the Ring Road",
            roads: "wide expressways of the NCR region",
            vibe: "daily commutes from Gurgaon to Connaught Place",
            state: "Delhi NCR",
            climate: "extreme summer heat and strict emission norms"
        }
    }
    if (c.includes('bangalore') || c.includes('bengaluru')) {
        return {
            traffic: "infamous Silk Board and Outer Ring Road bottlenecks",
            roads: "unpredictable potholes and steep tech-park ramps",
            vibe: "weekend getaways to Nandi Hills or Coorg",
            state: "Karnataka",
            climate: "pleasant IT-corridor weather"
        }
    }
    if (c.includes('hyderabad')) {
        return {
            traffic: "busy stretches of the IT corridor in HITEC City",
            roads: "the fast-paced Outer Ring Road (ORR)",
            vibe: "trips around Banjara Hills and Jubilee Hills",
            state: "Telangana",
            climate: "warm Deccan plateau temperatures"
        }
    }
    if (c.includes('chennai')) {
        return {
            traffic: "dense traffic along OMR and Anna Salai",
            roads: "coastal highways and humid city streets",
            vibe: "cruising down the East Coast Road (ECR)",
            state: "Tamil Nadu",
            climate: "sizzling tropical heat"
        }
    }
    if (c.includes('pune')) {
        return {
            traffic: "two-wheeler dominated streets of Hinjewadi",
            roads: "the scenic Pune-Mumbai expressway",
            vibe: "weekend drives to Lonavala and Khandala",
            state: "Maharashtra",
            climate: "pleasant hill-station proximity"
        }
    }
    if (c.includes('ahmedabad')) {
        return {
            traffic: "bustling traffic on SG Highway and Ashram Road",
            roads: "well-maintained urban infrastructure",
            vibe: "evening drives around the Sabarmati Riverfront",
            state: "Gujarat",
            climate: "dry, scorching summers"
        }
    }
    if (c.includes('kolkata')) {
        return {
            traffic: "congested lanes of Park Street and Howrah",
            roads: "historic streets and modern bypasses",
            vibe: "navigating the vibrant cultural heart of the city",
            state: "West Bengal",
            climate: "humid and heavy monsoon seasons"
        }
    }

    // Generic fallback for any other city (Tier 2/3)
    return {
        traffic: "daily urban commutes and peak-hour rushes",
        roads: "a mix of smooth highways and developing city roads",
        vibe: "weekend family trips and daily office runs",
        state: "your state",
        climate: "local Indian weather conditions"
    }
}

export default function CitySEOContent({
    brandName,
    modelName,
    cityName,
    bodyType = 'car',
    transmissions = ['Manual'],
    fuelTypes = ['Petrol']
}: CitySEOContentProps) {

    // Memoize the content so it doesn't change on re-renders,
    // but uniquely generates based on the props.
    const seoText = useMemo(() => {
        const traits = getCityTraits(cityName)
        // ✅ Guard against null values from the database.
        // Default params only cover `undefined`; the DB sometimes sends explicit `null`.
        const safeBodyType = (bodyType ?? 'car').toLowerCase()
        const safeTransmissions = (transmissions ?? ['Manual']).filter(Boolean)
        const safeFuelTypes = (fuelTypes ?? ['Petrol']).filter(Boolean)

        const hasAuto = safeTransmissions.some(t => t.toLowerCase().includes('auto') || t.toLowerCase() === 'amt' || t.toLowerCase() === 'cvt')
        const hasEV = safeFuelTypes.some(f => f.toLowerCase().includes('electric') || f.toLowerCase() === 'ev')
        const hasCNG = safeFuelTypes.some(f => f.toLowerCase().includes('cng'))
        const isSUV = safeBodyType.includes('suv')
        const isHatch = safeBodyType.includes('hatchback')

        // Build paragraph 1: City context & Transmission/Size
        let p1 = `Navigating through ${traits.traffic} is where the ${brandName} ${modelName} truly shines. `

        if (hasAuto) {
            if (isHatch) {
                p1 += `As a compact ${safeBodyType}, its automatic transmission options take the stress out of ${traits.vibe}, fitting perfectly into tight parking spaces. `
            } else {
                p1 += `Despite its presence, the available automatic transmission takes the effort out of driving along ${traits.vibe}. `
            }
        } else {
            p1 += `The refined manual gearbox offers absolute control whether you are on ${traits.roads} or making your daily commute. `
        }

        if (isSUV) {
            p1 += `Furthermore, the superior ground clearance ensures you confidently tackle ${traits.roads} without scraping the underbelly.`
        }

        // Build paragraph 2: Fuel efficiency & Climate/State
        let p2 = `Considering ${traits.state}'s specific RTO road tax structures, the ${modelName} offers phenomenal value. `

        if (hasEV) {
            p2 += `With the growing EV charging infrastructure across ${cityName.split(',')[0]}, opting for the electric variant brings running costs down to a fraction, perfectly countering ${traits.climate} while producing zero tailpipe emissions. `
        } else if (hasCNG) {
            p2 += `Given the volatile fuel prices, the factory-fitted CNG option is a massive hit among daily commuters looking for maximum mileage on ${traits.roads}. `
        } else {
            p2 += `The refined ${fuelTypes.join(' and ')} engine options are tuned to deliver excellent mileage in ${cityName.split(',')[0]} without compromising on the power needed for ${traits.vibe}. `
        }

        p2 += `Built to handle ${traits.climate}, its robust AC and cabin insulation keep the outside world at bay.`

        return { p1, p2, state: traits.state }
    }, [brandName, modelName, cityName, bodyType, transmissions, fuelTypes])

    return (
        <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
                Why Buy the {modelName} in {cityName.split(',')[0]}?
            </h3>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed font-medium">
                <p>{seoText.p1}</p>
                <p>{seoText.p2}</p>
            </div>
        </div>
    )
}
