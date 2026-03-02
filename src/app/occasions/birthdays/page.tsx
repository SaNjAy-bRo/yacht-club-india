'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Anchor, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BirthdaysPage() {
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
                    src="/images/s2.jpg"
                    alt="Birthday yacht celebration"
                    fill
                    sizes="100vw"
                    priority
                    className="occasion-page-hero-bg object-cover"
                />
                <div className="occasion-page-hero-overlay"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-36" data-reveal="true">
                    <p className="experience-page-kicker">Occasion Collection</p>
                    <h1 className="experience-page-title">Birthday Experiences</h1>
                    <p className="experience-page-sub">
                        Mark milestones with sea-view celebrations, curated music, and premium party-ready setup onboard.
                    </p>
                </div>
            </section>

            <section className="section-surface py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <h2 className="section-title">Birthday Packages</h2>
                    <p className="section-subtitle">From intimate gatherings to full private party charters, choose your format and let us style the rest.</p>

                    <div className="occasion-package-grid mt-12 grid gap-8 lg:grid-cols-3">
                        <article className="occasion-package-card flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="relative h-60 w-full">
                                <Image src="/images/c2.jpg" alt="Birthday classic package" fill className="object-cover" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Classic Birthday Sail</h3>
                                <p className="text-textMuted mb-6 flex-grow">2-hour private charter with music and celebration table setup for close family and friends.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Welcome refreshments</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Celebration styling</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Bluetooth music setup</span>
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
                                <Image src="/images/c6.jpg" alt="Birthday signature package" fill className="object-cover" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Signature Birthday</h3>
                                <p className="text-textMuted mb-6 flex-grow">Sunset cruise with custom decor, cake table arrangement, and curated route for photos.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Sunset premium slot</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Cake & decor zone</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Host assistance</span>
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
                                <Image src="/images/c7.jpg" alt="Birthday grand package" fill className="object-cover" />
                            </div>
                            <div className="occasion-package-body p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold font-jakarta text-textMain mb-2">Grand Celebration Yacht</h3>
                                <p className="text-textMuted mb-6 flex-grow">Extended party charter with entertainment-ready layout and concierge-managed flow.</p>
                                <ul className="occasion-package-list space-y-3 mb-8">
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Extended hours</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Premium party setup</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm font-medium">
                                        <Check className="w-5 h-5 text-gold shrink-0" />
                                        <span>Add-on support</span>
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
                            <p className="luxe-cta-kicker">Birthday Concierge</p>
                            <h3 className="luxe-cta-title">Plan Your Celebration on the Sea</h3>
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
