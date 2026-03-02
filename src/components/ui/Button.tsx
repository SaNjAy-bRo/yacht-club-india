import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'gold' | 'outline' | 'ghost';
    href?: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    className?: string;
}

export function Button({ variant = 'gold', href, icon: Icon, children, className = '', ...props }: ButtonProps) {
    const variantClass = variant === 'gold' ? 'btn-gold' : variant === 'outline' ? 'btn-outline' : 'btn-ghost';
    const iconClass = Icon ? 'btn-icon' : '';

    // We add the base classes just in case they are needed for layout, but rely on the classes in globals.css for colors/borders
    const combinedClasses = `${variantClass} ${iconClass} ${className}`.trim();

    const renderContent = () => (
        <>
            {Icon && <Icon className="w-[15px] h-[15px] shrink-0 stroke-[1.9]" />}
            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {renderContent()}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {renderContent()}
        </button>
    );
}
