'use client';

import { useState, useEffect } from 'react';
import styles from './TestDriveBottomBar.module.css';
import { Car, Calendar } from 'lucide-react';

interface TestDriveBottomBarProps {
    onBookTestDrive: () => void;
}

export default function TestDriveBottomBar({ onBookTestDrive }: TestDriveBottomBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show after scrolling down 300px
            if (currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textElement}>
                    <span className={styles.title}>Lowest Price Guaranteed</span>
                    <span className={styles.subtitle}>Save up to ₹50,000 & free EMI help</span>
                </div>
                <button className={styles.button} onClick={onBookTestDrive}>
                    <Car className="w-5 h-5" />
                    <span>Get Best Deal</span>
                </button>
            </div>
        </div>
    );
}
