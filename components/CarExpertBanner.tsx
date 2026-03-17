'use client';

import Link from 'next/link';
import { Target, Banknote, Search, PhoneCall } from 'lucide-react';
import styles from './CarExpertBanner.module.css';

interface CarExpertBannerProps {
    variant?: 'full' | 'compact' | 'inline';
    className?: string;
    // Dynamic text props
    title?: string;
    subtitle?: string;
    feature1?: string;
    feature2?: string;
    feature3?: string;
}

export default function CarExpertBanner({
    variant = 'full',
    className = '',
    title = 'Confused which car to buy?',
    subtitle = 'Get unbiased advice & save up to ₹50,000 on your next car',
    feature1 = 'Best Deals',
    feature2 = 'Price Negotiation',
    feature3 = 'Compare Cars'
}: CarExpertBannerProps) {
    return (
        <Link href="/car-expert" className={`${styles.banner} ${className}`}>
            {/* Main Content Box */}
            <div className={styles.mainBox}>
                <h3 className={styles.title}>
                    <span className={styles.titleOrange}>Car Buying</span>
                    <span className={styles.titleBlue}>Expert</span>
                </h3>
                <p className={styles.tagline}>Powered by <strong>gadizone</strong></p>
                <p className={styles.subtitle}>{title}</p>
                <p className={styles.description}>{subtitle}</p>
            </div>

            {/* Features Row */}
            <div className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <Target size={22} strokeWidth={2} />
                    </div>
                    <span className={styles.featureLabel}>{feature1.split(' ')[0]}</span>
                    <span className={styles.featureText}>{feature1.split(' ').slice(1).join(' ') || 'Deals'}</span>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <Banknote size={22} strokeWidth={2} />
                    </div>
                    <span className={styles.featureLabel}>{feature2.split(' ')[0]}</span>
                    <span className={styles.featureText}>{feature2.split(' ').slice(1).join(' ') || 'Help'}</span>
                </div>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <Search size={22} strokeWidth={2} />
                    </div>
                    <span className={styles.featureLabel}>{feature3.split(' ')[0]}</span>
                    <span className={styles.featureText}>{feature3.split(' ').slice(1).join(' ') || 'Cars'}</span>
                </div>
                <div className={styles.feature}>
                    <div className={styles.ctaCircle}>
                        <PhoneCall size={20} strokeWidth={2.5} />
                    </div>
                    <span className={styles.featureLabel}>Talk</span>
                    <span className={styles.featureText}>Now</span>
                </div>
            </div>
        </Link>
    );
}
