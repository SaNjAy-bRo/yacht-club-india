'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Anchor, Instagram, Play, Ship, Waves, Camera, Sunset, ShieldCheck, Utensils, Clock3, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

import faqsData from '@/data/faqs.json';
import fleetData from '@/data/fleet.json';

export default function BookingPage() {
    const router = useRouter();
    const [mainImg, setMainImg] = useState('/images/yacht.png');
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [selectedYacht, setSelectedYacht] = useState<any>(null);

    // Form State
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [duration, setDuration] = useState('2 Hours');
    const [addon, setAddon] = useState('Standard Package');

    const galleryImages = [
        '/images/yacht.png',
        '/images/c1.jpg',
        '/images/c2.jpg',
        '/images/c3.jpg'
    ];

    useEffect(() => {
        // Basic Intersection Observer for reveal animation
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

        // Load dynamic yacht data from URL params if present
        const searchParams = new URLSearchParams(window.location.search);
        const yachtId = searchParams.get('yachtId');
        if (yachtId) {
            const foundYacht = fleetData.find(y => y.id === yachtId);
            if (foundYacht) {
                setSelectedYacht(foundYacht);
                setMainImg(foundYacht.image);
            }
        }

        return () => io.disconnect();
    }, []);

    const toggleFaq = (id: string) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (selectedYacht) params.set('yachtId', selectedYacht.id);
        if (date) params.set('date', date);
        if (time) params.set('time', time);
        if (guests) params.set('guests', guests);
        if (duration) params.set('duration', duration);
        if (addon) params.set('addon', addon);

        router.push(`/checkout?${params.toString()}`);
    };

    return (
        <main className="pt-32">
            {/* Product / Booking Section */}
            <section className="booking-product py-16">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div data-reveal="true">
                        <div className="booking-main-image relative h-[450px]">
                            <Image
                                src={mainImg}
                                alt="Yacht gallery main image"
                                fill
                                className="object-cover rounded-2xl"
                                priority
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {galleryImages.map((src, idx) => (
                                <button
                                    key={idx}
                                    className={`booking-thumb relative h-24 ${mainImg === src ? 'is-active base-active-border' : ''}`}
                                    onClick={() => setMainImg(src)}
                                >
                                    <Image src={src} alt={`Yacht view ${idx + 1}`} fill className="object-cover rounded-xl" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <aside id="booking-form" className="booking-panel" data-reveal="true">
                        <p className="booking-label">Yacht Booking</p>
                        <h1 className="booking-title">{selectedYacht ? selectedYacht.title : 'Yacht Name Placeholder'}</h1>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="badge">Up to {selectedYacht ? selectedYacht.capacity.replace('Up to ', '').replace(' guests', '') : '___'} guests</span>
                            <span className="badge">{selectedYacht ? selectedYacht.duration.replace(' hrs', '') : '___'} hrs</span>
                            <span className="badge">Crew included</span>
                        </div>
                        <p className="booking-price mt-5">Starting from {selectedYacht ? selectedYacht.price : '₹____'} <span>/ hour</span></p>
                        <p className="booking-copy mt-4">Select your date and departure time to reserve this yacht. Final itinerary and add-ons can be customized with concierge support.</p>

                        <form className="mt-7 space-y-4" onSubmit={handleCheckout}>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="booking-field">
                                    <span>Departure Date</span>
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </label>
                                <label className="booking-field">
                                    <span>Departure Time</span>
                                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                                </label>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="booking-field">
                                    <span>Guests</span>
                                    <input type="number" min="1" placeholder="No. of guests" value={guests} onChange={(e) => setGuests(e.target.value)} required />
                                </label>
                                <label className="booking-field">
                                    <span>Duration</span>
                                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                        <option value="2 Hours">2 Hours</option>
                                        <option value="3 Hours">3 Hours</option>
                                        <option value="4 Hours">4 Hours</option>
                                        <option value="Sunset Slot">Sunset Slot</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </label>
                            </div>
                            <label className="booking-field">
                                <span>Add-ons</span>
                                <select value={addon} onChange={(e) => setAddon(e.target.value)}>
                                    <option value="Standard Package">Standard Package</option>
                                    <option value="Celebration Decor">Celebration Decor</option>
                                    <option value="Premium Dining Setup">Premium Dining Setup</option>
                                    <option value="Photo / Reel Shoot">Photo / Reel Shoot</option>
                                </select>
                            </label>
                            <button type="submit" className="btn-gold btn-icon booking-submit w-full mt-2 flex justify-center" style={{ width: '100%' }}>
                                <Anchor className="w-5 h-5" />
                                <span>Proceed to Checkout</span>
                            </button>
                        </form>
                    </aside>
                </div>
            </section>

            {/* Instagram Reels Section */}
            <section className="section-surface py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="section-title no-divider text-left">Instagram Reels</h2>
                        <Button href="#" variant="outline" icon={Instagram}>Follow @yachtclubindia_</Button>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((num) => (
                            <a key={num} href="#" className="reel-card relative h-80 block overflow-hidden rounded-2xl group">
                                <Image src={`/images/s${num}.jpg`} alt={`Instagram reel ${num}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <span className="reel-play absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-black/40 text-white rounded-full backdrop-blur-sm group-hover:bg-gold/90 transition-all">
                                    <Play className="w-5 h-5 ml-1" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Itinerary Section */}
            <section className="bg-[#F4F7FB] py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <h2 className="section-title">Sample Itinerary</h2>
                    <div className="itinerary-grid mt-10">
                        <article className="itinerary-card">
                            <span className="itinerary-time">00:00</span>
                            <h3 className="itinerary-head"><Ship /><span>Boarding & Welcome</span></h3>
                            <p>Meet crew at Brittona Jetty, safety briefing, welcome refreshments, and route briefing.</p>
                        </article>
                        <article className="itinerary-card">
                            <span className="itinerary-time">00:30</span>
                            <h3 className="itinerary-head"><Waves /><span>Scenic Cruise</span></h3>
                            <p>Leisure sail past signature Goa waterfront views with curated music and concierge service.</p>
                        </article>
                        <article className="itinerary-card">
                            <span className="itinerary-time">01:30</span>
                            <h3 className="itinerary-head"><Camera /><span>Anchor Stop</span></h3>
                            <p>Photo moments, celebration setup, and optional add-ons including decor and dining service.</p>
                        </article>
                        <article className="itinerary-card">
                            <span className="itinerary-time">02:30</span>
                            <h3 className="itinerary-head"><Sunset /><span>Sunset Return</span></h3>
                            <p>Return cruise with golden-hour views and smooth disembarkation support at the jetty.</p>
                        </article>
                    </div>
                </div>
            </section>



            {/* Features & Offers */}
            <section className="bg-[#F4F7FB] py-24">
                <div className="mx-auto max-w-7xl px-6" data-reveal="true">
                    <h2 className="section-title">Features & Offers</h2>
                    <p className="section-subtitle">What’s included in your booking and premium perks available for your charter.</p>
                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        <article className="feature-card">
                            <ShieldCheck className="w-8 h-8 text-gold mb-3" />
                            <h3>Safety Assured</h3>
                            <p>Certified crew, safety gear, and compliant onboard protocols.</p>
                        </article>
                        <article className="feature-card">
                            <Utensils className="w-8 h-8 text-gold mb-3" />
                            <h3>Premium Add-ons</h3>
                            <p>Optional dining setups, decor, music, and curated services.</p>
                        </article>
                        <article className="feature-card">
                            <Clock3 className="w-8 h-8 text-gold mb-3" />
                            <h3>Flexible Slots</h3>
                            <p>Day, sunset, and evening sail windows to match your plans.</p>
                        </article>
                        <article className="feature-card offer">
                            <Gift className="w-8 h-8 text-gold mb-3" />
                            <h3>Seasonal Offer</h3>
                            <p>Early booking benefit available on selected weekday charters.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Booking FAQs */}
            <section className="section-surface py-24">
                <div className="mx-auto max-w-4xl px-6" data-reveal="true">
                    <h2 className="section-title">Booking FAQs</h2>
                    <div className="mt-8 space-y-3" id="faq-list">
                        <article className="faq-item">
                            <button className="faq-trigger w-full text-left" aria-expanded={openFaq === 'faq1'} onClick={() => toggleFaq('faq1')}>
                                How much advance notice is required for booking?
                            </button>
                            <div className="faq-panel overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === 'faq1' ? '200px' : '0' }}>
                                <div className="pb-4">We recommend booking at least 48-72 hours in advance for preferred yachts and time slots.</div>
                            </div>
                        </article>
                        <article className="faq-item">
                            <button className="faq-trigger w-full text-left" aria-expanded={openFaq === 'faq2'} onClick={() => toggleFaq('faq2')}>
                                Can we modify guest count after booking?
                            </button>
                            <div className="faq-panel overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === 'faq2' ? '200px' : '0' }}>
                                <div className="pb-4">Yes, guest count can be adjusted based on yacht capacity and final confirmation cut-off time.</div>
                            </div>
                        </article>
                        <article className="faq-item">
                            <button className="faq-trigger w-full text-left" aria-expanded={openFaq === 'faq3'} onClick={() => toggleFaq('faq3')}>
                                Do you support custom occasions and decor?
                            </button>
                            <div className="faq-panel overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === 'faq3' ? '200px' : '0' }}>
                                <div className="pb-4">Absolutely. Share your occasion details and our team will tailor decor and onboard arrangements.</div>
                            </div>
                        </article>
                        <article className="faq-item">
                            <button className="faq-trigger w-full text-left" aria-expanded={openFaq === 'faq4'} onClick={() => toggleFaq('faq4')}>
                                What happens in case of weather disruption?
                            </button>
                            <div className="faq-panel overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === 'faq4' ? '200px' : '0' }}>
                                <div className="pb-4">Sailing depends on weather and port advisories. We offer rescheduling support for affected bookings.</div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
