'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronDown, Info, Pencil, Search, ArrowLeft, ArrowRight, Download, Zap, ShieldCheck } from 'lucide-react'
import analytics from '@/lib/analytics'
import { AnalyticsEvent } from '@/types/analytics'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const TataSierraAdBanner = dynamic(() => import('@/components/ads/TataSierraAdBanner'), { ssr: false })

interface CarVariant {
    id: string
    name: string
    price: number
    transmission?: string
    fuelType?: string
}

interface CarModel {
    id: string
    name: string
    brand: string
    slug: string
    brandSlug: string
    image?: string
    startingPrice?: number
}

export default function EmiCalculatorClient({
    initialPrice = 1358976,
    initialBrand = 'Hyundai',
    initialModel = 'Creta',
    initialVariant = 'E Petrol MT'
}) {
    const searchRef = useRef<HTMLDivElement>(null)

    // State
    const [calcMode, setCalcMode] = useState<'car' | 'amount'>('car')
    const [customLoanAmount, setCustomLoanAmount] = useState(1000000)
    const [amortizationView, setAmortizationView] = useState<'yearly' | 'monthly'>('yearly')
    const [quoteStatus, setQuoteStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const [carPrice, setCarPrice] = useState(initialPrice)
    const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2))
    const [tenure, setTenure] = useState(7)
    const [tenureMonths, setTenureMonths] = useState(84)
    const [interestRate, setInterestRate] = useState(8.5)

    // Section visibility
    const [showDownPayment, setShowDownPayment] = useState(true)
    const [showInterest, setShowInterest] = useState(true)

    // Car selection state
    const [showCarSearch, setShowCarSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<CarModel[]>([])
    const [allModels, setAllModels] = useState<CarModel[]>([])
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [selectionStep, setSelectionStep] = useState<'search' | 'variants'>('search')
    const [selectedModel, setSelectedModel] = useState<CarModel | null>(null)
    const [modelVariants, setModelVariants] = useState<CarVariant[]>([])
    const [loadingVariants, setLoadingVariants] = useState(false)

    const [selectedCar, setSelectedCar] = useState({
        brand: initialBrand,
        model: initialModel,
        variant: initialVariant,
        fullName: `${initialBrand} ${initialModel} ${initialVariant}`,
        price: initialPrice
    })

    // Analytics tracking
    useEffect(() => {
        const timer = setTimeout(() => {
            analytics.trackEvent(AnalyticsEvent.EMI_CALCULATED, {
                loan_amount: calcMode === 'car' ? carPrice - downPayment : customLoanAmount,
                interest_rate: interestRate,
                tenure_years: tenure,
                mode: calcMode,
                timestamp: Date.now()
            })
        }, 2000)
        return () => clearTimeout(timer)
    }, [carPrice, downPayment, customLoanAmount, interestRate, tenure, calcMode])

    // Fetch models on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
                const [brandsRes, modelsRes] = await Promise.all([
                    fetch(`${API_URL}/api/brands`),
                    fetch(`${API_URL}/api/models`)
                ])
                const brandsData = await brandsRes.json()
                const modelsData = await modelsRes.json()

                const brandMap = new Map()
                if (Array.isArray(brandsData)) {
                    brandsData.forEach((brand: any) => {
                        brandMap.set(brand.id, {
                            name: brand.name,
                            slug: brand.name.toLowerCase().replace(/\s+/g, '-')
                        })
                    })
                }

                if (Array.isArray(modelsData)) {
                    setAllModels(modelsData.map((model: any) => {
                        const brandInfo = brandMap.get(model.brandId) || { name: 'Unknown', slug: '' }
                        return {
                            id: model.id || model._id,
                            name: model.name,
                            brand: brandInfo.name,
                            slug: model.slug || model.name?.toLowerCase().replace(/\s+/g, '-'),
                            brandSlug: brandInfo.slug,
                            image: model.heroImage || model.image,
                            startingPrice: model.startingPrice || model.price || 1000000
                        }
                    }))
                }
                setModelsLoaded(true)
            } catch (error) {
                console.error('Failed to fetch data:', error)
                setModelsLoaded(true)
            }
        }
        fetchData()
    }, [])

    const fetchVariantsForModel = async (model: CarModel) => {
        setLoadingVariants(true)
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
            const response = await fetch(`${API_URL}/api/variants?modelId=${model.id}`)
            const data = await response.json()
            if (Array.isArray(data) && data.length > 0) {
                setModelVariants(data.map((v: any) => ({
                    id: v.id || v._id,
                    name: v.name,
                    price: v.exShowroomPrice || v.price || model.startingPrice || 1000000,
                    transmission: v.transmission,
                    fuelType: v.fuelType
                })))
            } else {
                setModelVariants([{ id: 'default', name: 'Base Variant', price: model.startingPrice || 1000000 }])
            }
        } catch {
            setModelVariants([{ id: 'default', name: 'Base Variant', price: model.startingPrice || 1000000 }])
        }
        setLoadingVariants(false)
    }

    useEffect(() => {
        if (searchQuery.length < 2) { setSearchResults([]); return }
        const query = searchQuery.toLowerCase()
        setSearchResults(allModels.filter(m =>
            m.name?.toLowerCase().includes(query) ||
            m.brand?.toLowerCase().includes(query) ||
            `${m.brand} ${m.name}`.toLowerCase().includes(query)
        ).slice(0, 10))
    }, [searchQuery, allModels])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowCarSearch(false)
                setSelectionStep('search')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelectModel = (model: CarModel) => {
        setSelectedModel(model)
        setSelectionStep('variants')
        fetchVariantsForModel(model)
    }

    const handleSelectVariant = (variant: CarVariant) => {
        if (!selectedModel) return
        setSelectedCar({
            brand: selectedModel.brand,
            model: selectedModel.name,
            variant: variant.name,
            fullName: `${selectedModel.brand} ${selectedModel.name} ${variant.name}`,
            price: variant.price
        })
        setCarPrice(variant.price)
        setDownPayment(Math.round(variant.price * 0.2))
        setShowCarSearch(false)
        setSelectionStep('search')
        setSelectedModel(null)
        setSearchQuery('')
    }

    const handleGetQuote = () => {
        setQuoteStatus('loading')
        setTimeout(() => {
            setQuoteStatus('success')
        }, 1500)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    // EMI Calculation
    const emiCalculation = useMemo(() => {
        const principal = calcMode === 'car' ? carPrice - downPayment : customLoanAmount
        const monthlyRate = interestRate / 12 / 100
        const months = tenureMonths
        if (monthlyRate === 0) {
            return { emi: Math.round(principal / months), totalAmount: principal, totalInterest: 0, principal }
        }
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
        const totalAmount = emi * months
        return { emi: Math.round(emi), totalAmount: Math.round(totalAmount), totalInterest: Math.round(totalAmount - principal), principal }
    }, [carPrice, downPayment, customLoanAmount, tenureMonths, interestRate, calcMode])

    // Amortization table
    const amortizationTable = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100
        const table = []
        let tempBalance = emiCalculation.principal

        if (amortizationView === 'monthly') {
            for (let i = 1; i <= tenureMonths; i++) {
                const interest = tempBalance * monthlyRate
                const principalPaid = emiCalculation.emi - interest
                tempBalance -= principalPaid
                table.push({
                    period: `Month ${i}`,
                    principal: Math.round(principalPaid),
                    interest: Math.round(interest),
                    balance: Math.max(0, Math.round(tempBalance))
                })
            }
        } else {
            for (let year = 1; year <= tenure; year++) {
                let yearlyPrincipal = 0
                let yearlyInterest = 0
                for (let m = 1; m <= 12; m++) {
                    if ((year - 1) * 12 + m > tenureMonths) break
                    const interest = tempBalance * monthlyRate
                    const principalPaid = emiCalculation.emi - interest
                    tempBalance -= principalPaid
                    yearlyPrincipal += principalPaid
                    yearlyInterest += interest
                }
                table.push({
                    period: `Year ${year}`,
                    principal: Math.round(yearlyPrincipal),
                    interest: Math.round(yearlyInterest),
                    balance: Math.max(0, Math.round(tempBalance))
                })
            }
        }
        return table
    }, [emiCalculation.principal, emiCalculation.emi, tenureMonths, interestRate, amortizationView, tenure])

    useEffect(() => { setTenureMonths(tenure * 12) }, [tenure])

    const loanAmount = calcMode === 'car' ? carPrice - downPayment : customLoanAmount
    const principalPercent = emiCalculation.totalAmount > 0
        ? Math.round((emiCalculation.principal / emiCalculation.totalAmount) * 100)
        : 100
    const interestPercent = 100 - principalPercent

    return (
        <>
            {/* Calculator Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-gray-100 bg-gray-50/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-gray-900">Choose your EMI options</h2>
                        <div className="flex p-1 bg-white border border-gray-200 rounded-xl self-start shadow-sm">
                            <button
                                onClick={() => setCalcMode('car')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${calcMode === 'car' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                By Car Model
                            </button>
                            <button
                                onClick={() => setCalcMode('amount')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${calcMode === 'amount' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                By Loan Amount
                            </button>
                        </div>
                    </div>
                </div>

                {calcMode === 'car' && (
                    <div className="p-5 sm:p-6 border-b border-gray-100 relative bg-white" ref={searchRef}>
                        <div className="flex items-center justify-between p-4 bg-orange-50/30 rounded-2xl border border-orange-100/50">
                            <div className="flex-1">
                                <p className="text-[10px] uppercase font-black text-orange-600/60 tracking-widest mb-1.5">Selected Vehicle</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="font-extrabold text-gray-900 text-lg leading-tight">{selectedCar.brand} {selectedCar.model}</p>
                                </div>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">{selectedCar.variant}</p>
                            </div>
                            <button
                                onClick={() => { setShowCarSearch(!showCarSearch); setSelectionStep('search') }}
                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                            >
                                <Pencil className="w-3.5 h-3.5 text-orange-500" />
                                <span>Change</span>
                            </button>
                        </div>

                        {showCarSearch && (
                            <div className="absolute left-4 right-4 top-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-30 p-3">
                                {selectionStep === 'search' ? (
                                    <>
                                        <div className="relative mb-3">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search car brand or model..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                                                autoFocus
                                            />
                                        </div>
                                        {searchQuery.length >= 2 && searchResults.length === 0 && modelsLoaded && (
                                            <p className="text-center py-4 text-gray-500 text-sm">No cars found</p>
                                        )}
                                        {searchResults.length > 0 && (
                                            <div className="max-h-48 overflow-y-auto space-y-1">
                                                {searchResults.map(model => (
                                                    <button
                                                        key={model.id}
                                                        onClick={() => handleSelectModel(model)}
                                                        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded text-left"
                                                    >
                                                        <p className="font-medium text-gray-900 text-sm">{model.brand} {model.name}</p>
                                                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {searchQuery.length < 2 && <p className="text-center py-4 text-gray-400 text-sm">Type at least 2 characters</p>}
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setSelectionStep('search'); setSelectedModel(null) }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-3">
                                            <ArrowLeft className="w-4 h-4" /> Back
                                        </button>
                                        <div className="bg-gray-50 rounded p-3 mb-3">
                                            <p className="font-semibold text-gray-900 text-sm">{selectedModel?.brand} {selectedModel?.name}</p>
                                        </div>
                                        {loadingVariants ? (
                                            <div className="text-center py-4">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                                            </div>
                                        ) : (
                                            <div className="max-h-48 overflow-y-auto space-y-1">
                                                {modelVariants.map(v => (
                                                    <button
                                                        key={v.id}
                                                        onClick={() => handleSelectVariant(v)}
                                                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100 text-left"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-sm">{v.name}</p>
                                                            {(v.transmission || v.fuelType) && <p className="text-xs text-gray-500">{[v.fuelType, v.transmission].filter(Boolean).join(' • ')}</p>}
                                                        </div>
                                                        <p className="font-semibold text-orange-600 text-sm">{formatCurrency(v.price)}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row">
                    {/* Left: Sliders & Inputs (60%) */}
                    <div className="lg:w-3/5 border-r border-gray-100 p-0">
                        {/* Down Payment / Custom Loan */}
                        {calcMode === 'car' ? (
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-900">
                                        Down Payment: <span className="text-orange-600 font-bold">{formatCurrency(downPayment)}</span>
                                    </label>
                                    <button onClick={() => setShowDownPayment(!showDownPayment)} className="text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 transition-colors">
                                        {showDownPayment ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {showDownPayment && (
                                    <div className="space-y-4">
                                        <input type="range" min={Math.round(carPrice * 0.2)} max={carPrice} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                                        <div className="relative group text-center">
                                            <input type="text" inputMode="numeric" value={downPayment} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setDownPayment(val ? Number(val) : 0) }} className="w-full max-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold bg-gray-50/50" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-6 border-b border-gray-100">
                                <label className="text-sm font-semibold text-gray-900 mb-4 block">
                                    Loan Amount: <span className="text-orange-600 font-bold">{formatCurrency(customLoanAmount)}</span>
                                </label>
                                <div className="space-y-4">
                                    <input type="range" min={50000} max={10000000} step={10000} value={customLoanAmount} onChange={(e) => setCustomLoanAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                                    <div className="relative group text-center">
                                        <input type="text" inputMode="numeric" value={customLoanAmount} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setCustomLoanAmount(val ? Number(val) : 0) }} className="w-full max-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold bg-gray-50/50" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tenure & Interest */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <label className="text-sm font-semibold text-gray-900">Tenure & Rate</label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">
                                        <span>Tenure: {tenure} Yrs</span>
                                    </div>
                                    <input type="range" min={1} max={7} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">
                                        <span>Interest: {interestRate}%</span>
                                    </div>
                                    <input type="range" min={8} max={20} step={0.5} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visualization & Breakup (40%) */}
                    <div className="lg:w-2/5 bg-gray-50/30 p-6 flex flex-col justify-between">
                        <div className="mb-0">
                            <div className="flex flex-col items-center gap-8">
                                <div
                                    className="w-48 h-48 rounded-full relative flex-shrink-0 shadow-lg"
                                    style={{
                                        background: `conic-gradient(#f97316 0% ${interestPercent}%, #1e40af ${interestPercent}% 100%)`
                                    }}
                                >
                                    <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center shadow-inner">
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Total Payable</p>
                                            <p className="text-sm font-black text-gray-900">{formatCurrency(emiCalculation.totalAmount)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                                            <span className="text-xs font-bold text-gray-500 uppercase">Principal</span>
                                        </div>
                                        <span className="font-extrabold text-gray-900">{formatCurrency(emiCalculation.principal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                                            <span className="text-xs font-bold text-gray-500 uppercase">Interest</span>
                                        </div>
                                        <span className="font-extrabold text-orange-600">{formatCurrency(emiCalculation.totalInterest)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-xl">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Monthly EMI</span>
                                <div className="text-3xl font-black mb-4">{formatCurrency(emiCalculation.emi)}</div>
                                <button
                                    onClick={handleGetQuote}
                                    disabled={quoteStatus !== 'idle'}
                                    className={`w-full py-3 rounded-xl text-sm font-black transition-all ${quoteStatus === 'success' ? 'bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                                >
                                    {quoteStatus === 'idle' && 'Get Best Quote'}
                                    {quoteStatus === 'loading' && 'Processing...'}
                                    {quoteStatus === 'success' && 'Quote Requested! ✓'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loan Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { label: 'Down Payment', value: `${((downPayment / carPrice) * 100).toFixed(0)}%`, sub: 'of price' },
                    { label: 'Total Interest', value: formatCurrency(emiCalculation.totalInterest), sub: 'payable' },
                    { label: 'Monthly Budget', value: formatCurrency(emiCalculation.emi), sub: '/mo' },
                    { label: 'Loan-to-Value', value: `${(100 - (downPayment / carPrice) * 100).toFixed(0)}%`, sub: 'Finance' }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-xl font-black text-gray-900">{item.value}</p>
                        <p className="text-[10px] font-bold text-gray-400">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Amortization Table */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mb-10">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 uppercase tracking-tight">Amortization Details</h3>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button onClick={() => setAmortizationView('yearly')} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg ${amortizationView === 'yearly' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}>Yearly</button>
                        <button onClick={() => setAmortizationView('monthly')} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg ${amortizationView === 'monthly' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}>Monthly</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
                            <tr>
                                <th className="px-6 py-4 text-left">Period</th>
                                <th className="px-6 py-4 text-right">Principal</th>
                                <th className="px-6 py-4 text-right">Interest</th>
                                <th className="px-6 py-4 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {amortizationTable.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-extrabold text-gray-900">{row.period}</td>
                                    <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(row.principal)}</td>
                                    <td className="px-6 py-4 text-right text-orange-600 font-bold">{formatCurrency(row.interest)}</td>
                                    <td className="px-6 py-4 text-right font-black text-gray-900">{formatCurrency(row.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AD Banner */}
            <div className="mb-10">
                <TataSierraAdBanner />
            </div>

            {/* Eligibility Form */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white mb-10">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="w-8 h-8 text-orange-500" />
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Check Loan Eligibility</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instant approval in 3 simple steps</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <input type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mobile Number</label>
                        <div className="flex">
                            <span className="bg-white/10 px-4 py-4 rounded-l-2xl border border-r-0 border-white/10 text-sm font-black text-orange-500">+91</span>
                            <input type="tel" placeholder="9876543210" className="w-full bg-white/5 border border-white/10 rounded-r-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold" />
                        </div>
                    </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2">
                    Check Offers Now <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-[10px] text-center text-gray-500 mt-6 font-bold uppercase tracking-widest">
                    Secure & Confidential • No Credit Score Impact
                </p>
            </div>
        </>
    )
}
