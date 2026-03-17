import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { TrendingUp, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import EmiCalculatorClient from '@/components/emi/EmiCalculatorClient'
import { generateFinancialProductSchema, generateFAQSchema } from '@/lib/structured-data'
import JsonLd from '@/components/seo/JsonLd'
import PageContainer, { PageSection } from '@/components/layout/PageContainer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Footer from '@/components/Footer'
import CarExpertBanner from '@/components/CarExpertBanner'

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 3600 // Revalidate every hour

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
    title: `Car Loan EMI Calculator ${currentYear} – Calculate Monthly Car Loan EMI Online | Gadizone`,
    description: `Use the free Gadizone Car Loan EMI Calculator to estimate your monthly car loan EMI for ${currentYear}. Enter loan amount, interest rate & tenure to get instant EMI, total interest, and amortization schedule. Plan your car purchase smartly.`,
    keywords: `car loan EMI calculator, car loan calculator India, EMI calculator for car, car EMI calculator online, monthly car EMI, car loan interest calculator, car finance calculator, auto loan EMI India ${currentYear}`,
    alternates: {
        canonical: '/car-loan-emi-calculator',
    },
    openGraph: {
        title: `Car Loan EMI Calculator – Calculate Monthly Car Loan EMI Online | Gadizone`,
        description: `Free online car loan EMI calculator. Enter loan amount, interest rate and tenure to calculate EMI, total interest payable and view full amortization schedule.`,
        type: 'website',
    },
}

const faqs = [
    {
        question: 'How is car loan EMI calculated?',
        answer: `Car loan EMI is calculated using the standard reducing-balance formula: E = P × R × (1+R)^N / [(1+R)^N − 1], where E = EMI amount, P = Principal loan amount, R = Monthly interest rate (annual rate ÷ 12 ÷ 100), and N = Total number of monthly instalments. The formula ensures each EMI covers both interest and a portion of principal, with the interest component decreasing over time.`,
    },
    {
        question: 'What is the minimum CIBIL score required for a car loan in India?',
        answer: `Most banks and NBFCs require a minimum CIBIL score of 700 for car loan approval. However, a score of 750 and above significantly improves your chances of getting faster approval at lower interest rates. Some lenders may approve loans for scores between 650–700 but with higher interest rates or stricter terms.`,
    },
    {
        question: 'Can I prepay or foreclose my car loan early?',
        answer: `Yes, most lenders in India allow part-prepayment or full foreclosure of car loans. Under RBI guidelines, floating-rate loans cannot have prepayment penalties. For fixed-rate car loans, banks may charge a foreclosure fee of 2–5% of the outstanding principal. Many lenders waive this fee after a lock-in period of 6–12 months.`,
    },
    {
        question: 'What is the maximum tenure for a car loan in India?',
        answer: `Most banks offer car loan tenures ranging from 1 year to 7 years (12–84 months). Some lenders like SBI and HDFC Bank offer tenure up to 8 years for new cars. For used cars, maximum tenure is typically shorter — around 3 to 5 years depending on the vehicle's age.`,
    },
    {
        question: 'What documents are required for a car loan application?',
        answer: `Typically you need: (1) Identity proof – Aadhaar card, PAN card, Passport or Voter ID; (2) Address proof – Utility bill, Aadhaar, or Passport; (3) Income proof – Salary slips (last 3 months) for salaried, or ITR/profit & loss statements for self-employed; (4) Bank statements for the last 6 months; (5) Passport-size photographs; (6) Signed loan application form.`,
    },
    {
        question: 'Is a down payment mandatory for car loans?',
        answer: `While some banks advertise 100% on-road price financing, most lenders require a minimum down payment of 10–20% of the car's on-road price. Making a higher down payment (20–30%) reduces your loan amount, monthly EMI, and total interest outgo — making the loan more affordable overall.`,
    },
    {
        question: 'Which is better for a car loan — fixed or floating interest rate?',
        answer: `Most car loans in India carry a fixed interest rate, meaning your EMI stays constant throughout the tenure. This makes budgeting predictable. Floating-rate car loans are rare. For short-tenure loans (3–5 years), fixed rates offer more certainty. Always compare the total cost of the loan rather than just the monthly EMI.`,
    },
    {
        question: 'Can I get a car loan for a used or second-hand car?',
        answer: `Yes, major banks and NBFCs offer used car loans. However, interest rates for used car loans are typically 1–3% higher than new car loans, and the maximum loan tenure is shorter (usually up to 5 years). The car's age and condition are factored into the loan amount and eligibility.`,
    },
]

export default function CarLoanEMICalculatorPage() {
    const financialSchema = generateFinancialProductSchema()
    const faqSchema = generateFAQSchema(faqs)

    return (
        <div className="min-h-screen bg-gray-50">
            <JsonLd data={financialSchema} />
            <JsonLd data={faqSchema} />

            <PageContainer maxWidth="lg">
                <PageSection spacing="normal">
                    {/* Page Heading (Server Rendered) */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Car Loan EMI Calculator</h1>
                            <p className="text-gray-600 mt-2 text-lg">Calculate your monthly car loan EMI and plan your finances before buying your dream car.</p>
                        </div>
                        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border border-orange-200 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Updated for March {currentYear}
                        </div>
                    </div>

                    {/* Interactive Calculator (Client Side) */}
                    <Suspense fallback={
                        <div className="bg-white rounded-2xl shadow-xl h-[600px] flex items-center justify-center border border-gray-100">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto mb-4"></div>
                                <p className="text-gray-500 font-medium">Initializing Calculator...</p>
                            </div>
                        </div>
                    }>
                        <EmiCalculatorClient
                            initialPrice={1358976}
                            initialBrand="Hyundai"
                            initialModel="Creta"
                            initialVariant="E Petrol MT"
                        />
                    </Suspense>

                    {/* Car Expert Banner (Server Rendered) */}
                    <div className="mt-8">
                        <CarExpertBanner
                            title="Need help with car financing options?"
                            subtitle="Our experts help you find the best loan deals & EMI options for your budget"
                            feature1="Loan Advice"
                            feature2="Best Rates"
                            feature3="EMI Planning"
                        />
                    </div>

                    {/* SEO CONTENT SECTIONS (Server Rendered for Performance) */}
                    <div className="mt-12 space-y-12">
                        {/* Section 1: What is a Car Loan EMI Calculator */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">What is a Car Loan EMI Calculator?</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                A Car Loan EMI Calculator is an online financial tool that instantly computes your <strong>Equated Monthly Instalment (EMI)</strong> — the fixed amount you pay every month towards repaying a vehicle loan. Whether you are purchasing a hatchback, sedan, SUV, or electric car, knowing your EMI upfront helps you budget effectively and choose a loan that does not stretch your finances.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                India is one of the world&apos;s fastest-growing automobile markets, with year-on-year growth in car sales exceeding 8%. As car prices rise and more buyers opt for longer loan tenures, having a reliable EMI calculator has become essential. Instead of manually crunching numbers, the Gadizone EMI Calculator lets you input your loan amount, interest rate, and tenure to get accurate results within seconds.
                            </p>
                            <div className="bg-blue-50/50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Our calculator also provides a complete <strong>amortization schedule</strong> — a year-by-year break-down showing how much of each payment goes towards the principal and how much towards interest. This transparency empowers you to compare multiple loan offers, negotiate better terms with lenders, and ultimately save money.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: How is EMI Calculated */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">How is Car Loan EMI Calculated?</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                The car loan EMI is computed using the standard <strong>reducing-balance method</strong>, ensuring you pay interest only on the outstanding principal.
                            </p>
                            <div className="relative p-8 bg-gray-900 rounded-3xl text-center overflow-hidden mb-8 group">
                                <p className="text-xl sm:text-2xl font-black text-white mb-2 tracking-wider">E = P × R × (1+R)ⁿ / ((1+R)ⁿ - 1)</p>
                                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">The Mathematical Standard</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { label: "P", name: "Principal", desc: "Total loan amount borrowed" },
                                    { label: "R", name: "Monthly Rate", desc: "Annual rate / 12 / 100" },
                                    { label: "N", name: "Tenure", desc: "Total months (e.g. 60 for 5yrs)" },
                                    { label: "E", name: "EMI", desc: "Equated Monthly Instalment" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-orange-600 shadow-sm border border-orange-100">
                                            {item.label}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: Understanding the Amortization Schedule */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm overflow-hidden">
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-6">Mastering Your Amortization Schedule</h2>
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                                        An amortization schedule is more than just a table; it&apos;s your financial roadmap. It shows exactly how your EMI is split between **Principal Repayment** and **Interest Cost** over time.
                                    </p>
                                    <ul className="space-y-3">
                                        {["Interest is front-loaded in early years", "Principal share grows as the loan matures", "Each payment reduces the next interest calculation"].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full lg:w-64 aspect-square bg-orange-50 rounded-3xl flex items-center justify-center relative p-6 border border-orange-100 font-black text-orange-600">
                                    VISUALIZATION
                                </div>
                            </div>
                        </section>

                        {/* Section 4 & 5: Benefits & Usage */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">Why Use Gadizone?</h2>
                                <div className="space-y-4">
                                    {[
                                        { icon: Zap, text: "Instant results with 100% accuracy" },
                                        { icon: ShieldCheck, text: "No personal data required to calculate" },
                                        { icon: TrendingUp, text: "Detailed amortization for smart planning" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-600">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">How to use?</h2>
                                <div className="space-y-3">
                                    {["Enter Loan Amount or Select Car", "Pick Interest Rate from current bank offers", "Slide Tenure from 1 to 7 years", "Instantly check your Monthly EMI"].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <span className="text-xs font-black text-orange-300">0{i + 1}</span>
                                            <span className="text-sm font-bold text-gray-600">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Section 6: Smart Tips */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Smart Tips to Reduce Your Car Loan EMI</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Make a Larger Down Payment", desc: "Putting 25–30% down instead of the minimum noticeably reduces your EMI and total interest outgo." },
                                    { title: "Opt for a Shorter Tenure", desc: "A 3-year loan costs less in total interest than a 7-year loan, saving you thousands in the long run." },
                                    { title: "Negotiate the Interest Rate", desc: "Even a 0.5% reduction can save ₹10,000–₹30,000. Always compare multiple lenders before finalizing." },
                                    { title: "Maintain a High Credit Score", desc: "A score above 750 unlocks premium rates. Keep your credit utilization low and pay bills on time." }
                                ].map((tip, i) => (
                                    <div key={i} className="flex gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 7: Bank Rates Table */}
                        <section className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm overflow-hidden relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Current Car Loan Interest Rates ({currentYear})</h2>
                            </div>
                            <p className="text-gray-600 text-lg mb-8">Compare leading Indian lenders to find the lowest cost financing for your new car.</p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-separate border-spacing-0">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-4 px-6 font-black uppercase tracking-widest text-[10px] text-gray-400 border-b-2 border-gray-100 rounded-tl-2xl">Bank</th>
                                            <th className="text-center py-4 px-6 font-black uppercase tracking-widest text-[10px] text-gray-400 border-b-2 border-gray-100">Interest Rate</th>
                                            <th className="text-center py-4 px-6 font-black uppercase tracking-widest text-[10px] text-gray-400 border-b-2 border-gray-100 rounded-tr-2xl">Tenure</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { b: "SBI", r: "8.50% - 9.85%", t: "7 Yrs" },
                                            { b: "HDFC Bank", r: "8.75% - 9.50%", t: "7 Yrs" },
                                            { b: "ICICI Bank", r: "8.80% - 10.20%", t: "7 Yrs" },
                                            { b: "Axis Bank", r: "8.95% - 10.50%", t: "5 Yrs" },
                                            { b: "Bank of Baroda", r: "8.45% - 10.00%", t: "7 Yrs" }
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6 font-bold text-gray-900">{row.b}</td>
                                                <td className="py-4 px-6 text-center text-orange-600 font-extrabold">{row.r}</td>
                                                <td className="py-4 px-6 text-center text-gray-500 font-bold">{row.t}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-wider italic">* Rates subject to change. Last updated March {currentYear}.</p>
                        </section>

                        {/* Section 8: FAQs */}
                        <section className="bg-gray-900 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-10 relative">Frequently Asked Questions</h2>
                            <div className="space-y-4 relative">
                                {faqs.map((faq, index) => (
                                    <details key={index} className="group bg-white/5 border border-white/10 rounded-3xl p-6 transition-all hover:bg-white/[0.08]">
                                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-white hover:text-orange-400 transition-colors">
                                            <span className="text-lg pr-4">{faq.question}</span>
                                            <span className="shrink-0 transition-transform duration-300 group-open:rotate-180 bg-white/10 rounded-full p-1">
                                                <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <div className="overflow-hidden">
                                            <div className="pt-4 text-gray-400 text-sm leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>

                        {/* Explore More Tools */}
                        <div className="pt-6 pb-12">
                            <h3 className="text-base font-semibold text-gray-900 mb-4 px-1">Explore More Tools</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/emi-calculator" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                    EMI Calculator <ArrowRight className="w-3 h-3" />
                                </Link>
                                <Link href="/fuel-cost-calculator" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                    Fuel Cost Calculator <ArrowRight className="w-3 h-3" />
                                </Link>
                                <Link href="/compare" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                    Compare Cars <ArrowRight className="w-3 h-3" />
                                </Link>
                                <Link href="/location" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                    Check On-Road Price <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </PageSection>
            </PageContainer>

            <Breadcrumb items={[{ label: 'Car Loan EMI Calculator' }]} />
            <Footer />
        </div>
    )
}
