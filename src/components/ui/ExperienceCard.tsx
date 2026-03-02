import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
}

export function ExperienceCard({ title, description, price, image }: ExperienceCardProps) {
    return (
        <article className="exp-card">
            <div className="image-ph exp-image">
                <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 300px" />
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-copy">{description}</p>
            <div className="meta-row">
                <p className="card-meta">{price}</p>
                <button className="enquire-chip btn-icon">
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>
        </article>
    );
}
