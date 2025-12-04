"use client"

import { useState, useEffect } from 'react';
import { healthTips } from '@/lib/data/tips';

export default function AnimatedTips() {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
        }, 5000); // Change tip every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-blue-50 border-b border-blue-100 py-2 px-4 text-center overflow-hidden">
            <p className="text-blue-800 text-sm font-medium animate-fade-in key={currentTipIndex}">
                💡 Dica: {healthTips[currentTipIndex]}
            </p>
        </div>
    );
}
