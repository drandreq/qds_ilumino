import React from 'react';
import { motion } from 'framer-motion';

interface BreadcrumbsProps {
    history: { id: string; question: string; answer: string; label?: string }[];
}

export default function Breadcrumbs({ history }: BreadcrumbsProps) {
    if (!history || history.length === 0) return null;

    return (
        <div className="mt-8 w-full max-w-2xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Caminho percorrido</h3>
            <div className="flex flex-wrap gap-2 items-end">
                {history.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="flex flex-col">
                            {item.label && <span className="text-[10px] text-gray-400 mb-0.5">{item.label}</span>}
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                {item.answer}
                            </span>
                        </div>
                        {index < history.length - 1 && (
                            <span className="mx-2 text-gray-300 mb-2">→</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
