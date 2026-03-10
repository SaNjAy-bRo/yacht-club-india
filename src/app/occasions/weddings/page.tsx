'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Anchor, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WeddingsPage() {
    useEffect(() => {
        const revealEls = document.querySelectorAll('[data-reveal]');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <main className="pt-24">
            <section className="occasion-page-hero relative overflow-hidden">
                <Image
                    src="/images/s4.jpg"
                    alt="Wedding yacht celebration"
                    fill
                    sizes="100vw"
                    priority
                    className="occasion-page-hero-bg object-fill"
                />
                <div className="occasion-page-hero-overlay"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36" data-reveal="true">
                    <p className="experience-page-kicker">Occasion Collection</p>
                    <h1 className="experience-page-title">Wedding Experiences</h1>
                    <p className="experience-page-sub">
                        Create an intimate wedding-at-sea moment with refined styling, curated routes, and premium service from boarding to return.
                    </p>
                </div>
            </section>

            <section className="section-surface py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <h2 className="section-title">Wedding Packages</h2>
                    <p className="section-subtitle">Choose a package designed for pre-wedding shoots, intimate ceremonies, or premium private celebrations.</p>

                    <div className="occasion-package-grid mt-12 grid gap-8 lg:grid-cols-3">
                        <article className="occasion-package-card flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="relative h-60 w-full">
                                <Image src="/images/c5.jpg" alt="Pre wedding package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Pre-Wedding Signature</h3>
                                <p className="text-textMuted mb-6 flex-grow">Styled charter with route timing, decor zones, and visual-first deck setup for shoot sessions.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Photography route planning</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Styled deck corners</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Crew coordination</span>
                                    </li>
                                </ul>
                                <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-auto">
                                    <span className="font-semibold text-textMain">Starting from ₹____</span>
                                    <Button href="/booking" variant="gold" icon={Anchor}>Book Now</Button>
                                </div>
                            </div>
                        </article>

                        <article className="occasion-package-card flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="relative h-60 w-full">
                                <Image src="/images/c3.jpg" alt="Intimate wedding package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Intimate Ceremony</h3>
                                <p className="text-textMuted mb-6 flex-grow">Private ceremony sail with custom decor, seating flow, and concierge-managed guest experience.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Guest-ready setup</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Floral styling options</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Celebration service</span>
                                    </li>
                                </ul>
                                <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-auto">
                                    <span className="font-semibold text-textMain">Starting from ₹____</span>
                                    <Button href="/booking" variant="gold" icon={Anchor}>Book Now</Button>
                                </div>
                            </div>
                        </article>

                        <article className="occasion-package-card flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="relative h-60 w-full">
                                <Image src="/images/c8.jpg" alt="Grand wedding package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Grand Wedding Charter</h3>
                                <p className="text-textMuted mb-6 flex-grow">Extended premium yacht celebration with elevated hospitality, entertainment, and styling.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Extended luxury slot</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Premium hosting flow</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Concierge-led execution</span>
                                    </li>
                                </ul>
                                <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-auto">
                                    <span className="font-semibold text-textMain">Starting from ₹____</span>
                                    <Button href="/booking" variant="gold" icon={Anchor}>Book Now</Button>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="luxe-cta-wrap">
                <div className="luxe-cta-box" data-reveal="true">
                    <div className="luxe-cta-inner">
                        <div className="luxe-cta-copy">
                            <p className="luxe-cta-kicker">Wedding Concierge</p>
                            <h3 className="luxe-cta-title">Secure Your Preferred Celebration Slot</h3>
                        </div>
                        <Button href="/booking" variant="gold" icon={Anchor} className="luxe-cta-btn text-white" style={{ background: '#102A47', borderColor: 'rgba(9, 25, 45, 0.35)' }}>
                            Book a Yacht
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
