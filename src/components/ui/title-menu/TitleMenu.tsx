'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    subtitle: string;
    className?: string;
    variant?: 'default' | 'centered' | 'minimal' | 'hero';
    showDivider?: boolean;
    titleColor?: 'primary' | 'secondary' | 'dark' | 'gradient';
}

export default function TitleMenu({ 
    title, 
    subtitle, 
    className = '',
    variant = 'default',
    showDivider = true,
    titleColor = 'gradient'
}: Props) {
    
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    const variantStyles = {
        default: "text-left",
        centered: "text-center",
        minimal: "text-left border-l-4 border-[#53ad35] pl-6",
        hero: "text-center py-12"
    };

    const titleColorStyles = {
        primary: "text-[#53ad35]",
        secondary: "text-[#34a32a]",
        dark: "text-[#313b48]",
        gradient: "bg-gradient-to-r from-[#53ad35] via-[#34a32a] to-[#006633] bg-clip-text text-transparent"
    };

    const titleSizes = {
        default: "text-3xl md:text-4xl",
        centered: "text-4xl md:text-5xl",
        minimal: "text-2xl md:text-3xl",
        hero: "text-5xl md:text-6xl lg:text-7xl"
    };

    const subtitleSizes = {
        default: "text-lg md:text-xl",
        centered: "text-xl md:text-2xl",
        minimal: "text-base md:text-lg",
        hero: "text-2xl md:text-3xl"
    };

    return (
        <motion.div 
            className={`${variantStyles[variant]} ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 
                className={`
                    ${titleSizes[variant]} 
                    ${titleColorStyles[titleColor]} 
                    font-extrabold 
                    leading-tight 
                    ${variant === 'minimal' ? 'mb-2' : 'mb-4'}
                    ${variant === 'hero' ? 'mb-6' : ''}
                `}
                variants={itemVariants}
            >
                {title}
            </motion.h1>

            <motion.p 
                className={`
                    ${subtitleSizes[variant]} 
                    text-[#28313d] 
                    leading-relaxed
                    ${variant === 'hero' ? 'max-w-4xl mx-auto opacity-90' : 'max-w-3xl'}
                    ${variant === 'centered' ? 'mx-auto' : ''}
                `}
                variants={itemVariants}
            >
                {subtitle}
            </motion.p>

            {showDivider && variant !== 'minimal' && (
                <motion.div 
                    className={`
                        mt-2 flex items-center gap-4
                        ${variant === 'centered' ? 'justify-center' : ''}
                    `}
                    variants={itemVariants}
                >
                    <div className="h-1 w-12 bg-gradient-to-r from-[#53ad35] to-[#34a32a] rounded-full" />
                    <div className="h-1 w-8 bg-[#53ad35]/50 rounded-full" />
                    <div className="h-1 w-4 bg-[#53ad35]/30 rounded-full" />
                </motion.div>
            )}

            {variant === 'hero' && (
                <>
                    <motion.div 
                        className="absolute top-10 left-10 w-32 h-32 bg-[#53ad35]/10 rounded-full blur-2xl"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div 
                        className="absolute bottom-10 right-10 w-40 h-40 bg-[#34a32a]/10 rounded-full blur-2xl"
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.1, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </>
            )}
        </motion.div>
    );
}

export const PageHeader = ({ 
    title, 
    subtitle, 
    breadcrumb 
}: { 
    title: string; 
    subtitle: string; 
    breadcrumb?: string[] 
}) => {
    return (
        <div className="bg-gradient-to-r from-gray-50 to-green-50/30 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {breadcrumb && (
                    <motion.nav 
                        className="flex mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            {breadcrumb.map((item, index) => (
                                <li key={index} className="inline-flex items-center">
                                    {index > 0 && (
                                        <span className="mx-2 text-[#28313d]/50">/</span>
                                    )}
                                    <span className={`
                                        text-sm font-medium
                                        ${index === breadcrumb.length - 1 
                                            ? 'text-[#53ad35]' 
                                            : 'text-[#28313d]/70 hover:text-[#53ad35]'
                                        }
                                    `}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </motion.nav>
                )}

                <TitleMenu 
                    title={title}
                    subtitle={subtitle}
                    variant="hero"
                    titleColor="gradient"
                    showDivider={false}
                />
            </div>
        </div>
    );
};

export const useTitleMenu = () => {
    return {
        variants: {
            page: { variant: 'hero' as const, titleColor: 'gradient' as const },
            section: { variant: 'centered' as const, titleColor: 'primary' as const },
            card: { variant: 'minimal' as const, titleColor: 'dark' as const },
            default: { variant: 'default' as const, titleColor: 'gradient' as const }
        }
    };
};