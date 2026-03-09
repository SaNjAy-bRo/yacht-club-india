'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Anchor, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CorporatePage() {
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
                    src="/images/s5.jpg"
                    alt="Corporate yacht event"
                    fill
                    sizes="100vw"
                    priority
                    className="occasion-page-hero-bg object-fill"
                />
                <div className="occasion-page-hero-overlay"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36" data-reveal="true">
                    <p className="experience-page-kicker">Occasion Collection</p>
                    <h1 className="experience-page-title">Corporate Experiences</h1>
                    <p className="experience-page-sub">
                        Host elevated corporate gatherings at sea with private charters built for networking, leadership events, and client entertainment.
                    </p>
                </div>
            </section>

            <section className="section-surface py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <h2 className="section-title">Corporate Packages</h2>
                    <p className="section-subtitle">Three formats tailored for executive meetings, partner hosting, and premium team offsites.</p>

                    <div className="occasion-package-grid mt-12 grid gap-8 lg:grid-cols-3">
                        <article className="occasion-package-card flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="relative h-60 w-full">
                                <Image src="/images/c6.jpg" alt="Corporate compact package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Executive Compact</h3>
                                <p className="text-textMuted mb-6 flex-grow">Focused private cruise for smaller leadership teams with meeting-friendly deck setup.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Boardroom-style arrangement</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Premium refreshment service</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Dedicated host</span>
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
                                <Image src="/images/c3.jpg" alt="Corporate signature package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Signature Corporate</h3>
                                <p className="text-textMuted mb-6 flex-grow">Sunset networking cruise with curated hospitality and guest-first circulation planning.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Sunset premium route</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Networking-led layout</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Branded touchpoints</span>
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
                                <Image src="/images/c8.jpg" alt="Corporate grand package" fill className="object-fill" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Premier Corporate Charter</h3>
                                <p className="text-textMuted mb-6 flex-grow">Full-scale premium charter for client entertainment, product moments, and celebration nights.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Extended charter plan</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Premium dining options</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Concierge execution</span>
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
                            <p className="luxe-cta-kicker">Corporate Concierge</p>
                            <h3 className="luxe-cta-title">Plan Your Next Sea-Hosted Event</h3>
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
