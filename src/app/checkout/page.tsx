'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, Minus, Plus, Ship, Clock, Users, CalendarDays, MapPin, CreditCard, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import fleetData from '@/data/fleet.json';

export default function CheckoutPage() {
    const [step, setStep] = useState(1); // 1 = Cart, 2 = Checkout
    const [bookingData, setBookingData] = useState<any>(null);
    const [yacht, setYacht] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    // Checkout form state
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [country, setCountry] = useState('India');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('razorpay');

    // Toggle optional fields
    const [showCompany, setShowCompany] = useState(false);
    const [showAddress2, setShowAddress2] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const data = {
            yachtId: searchParams.get('yachtId'),
            date: searchParams.get('date'),
            time: searchParams.get('time'),
            guests: searchParams.get('guests'),
            duration: searchParams.get('duration'),
            addon: searchParams.get('addon'),
        };

        if (data.yachtId) {
            const foundYacht = fleetData.find(y => y.id === data.yachtId);
            if (foundYacht) setYacht(foundYacht);
        }

        setBookingData(data);
    }, []);

    // Format date nicely
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '--';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Format time nicely
    const formatTime = (timeStr: string | null) => {
        if (!timeStr) return '--';
        const [h, m] = timeStr.split(':');
        const hr = parseInt(h);
        const ampm = hr >= 12 ? 'PM' : 'AM';
        const hr12 = hr % 12 || 12;
        return `${hr12}:${m} ${ampm}`;
    };

    // Calculate price
    const getHours = () => {
        if (!bookingData?.duration) return 2;
        const match = bookingData.duration.match(/\d+/);
        return match ? parseInt(match[0], 10) : 2;
    };

    const getAddonCost = () => {
        if (!bookingData?.addon) return 0;
        if (bookingData.addon === 'Celebration Decor') return 5000;
        if (bookingData.addon === 'Premium Dining Setup') return 8000;
        if (bookingData.addon === 'Photo / Reel Shoot') return 15000;
        return 0;
    };

    const basePrice = (yacht?.pricePerHour || 0) * getHours();
    const addonCost = getAddonCost();
    const subtotal = (basePrice + addonCost) * quantity;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // Razorpay integration hook — this is where the gateway trigger goes
        const orderPayload = {
            yacht: yacht?.title,
            yachtId: yacht?.id,
            date: bookingData?.date,
            time: bookingData?.time,
            guests: bookingData?.guests,
            duration: bookingData?.duration,
            addon: bookingData?.addon,
            quantity,
            subtotal,
            customer: { firstName, lastName, email, phone, company, address, addressLine2, country, state, city, pincode },
            paymentMethod,
        };
        console.log('Order Payload (ready for API/Admin):', orderPayload);
        alert(`This will trigger the Razorpay gateway.\n\nOrder Total: ₹${subtotal.toLocaleString()}\n\nOrder payload logged to console for admin/API integration.`);
    };

    const inputClass = "w-full border border-black/10 rounded-lg px-4 py-3.5 text-sm text-textMain placeholder:text-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all bg-white";

    return (
        <main className="pt-32 pb-24 min-h-screen" style={{ background: '#F7F8FA' }}>
            <div className="mx-auto max-w-3xl px-6">

                {/* Back link */}
                <div className="mb-6">
                    {step === 1 ? (
                        <Link href="/booking" className="inline-flex items-center text-sm font-semibold text-textMuted hover:text-gold transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Booking
                        </Link>
                    ) : (
                        <button onClick={() => setStep(1)} className="inline-flex items-center text-sm font-semibold text-textMuted hover:text-gold transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Cart
                        </button>
                    )}
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-3 mb-8">
                    <div className={`flex items-center gap-2 text-sm font-bold ${step >= 1 ? 'text-[#10233D]' : 'text-textMuted'}`}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#10233D] text-white' : 'bg-black/10 text-textMuted'}`}>1</span>
                        Cart
                    </div>
                    <div className="flex-1 h-px bg-black/10" />
                    <div className={`flex items-center gap-2 text-sm font-bold ${step >= 2 ? 'text-[#10233D]' : 'text-textMuted'}`}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#10233D] text-white' : 'bg-black/10 text-textMuted'}`}>2</span>
                        Checkout
                    </div>
                </div>

                {/* ═══════════════════ STEP 1: CART ═══════════════════ */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                        {/* Cart Header */}
                        <div className="px-8 py-5 border-b border-black/5 flex items-center justify-between">
                            <h1 className="text-2xl font-black font-jakarta text-textMain">Your Booking</h1>
                            <div className="flex items-center gap-2 text-sm text-textMuted">
                                <Ship className="w-4 h-4 text-gold" />
                                <span>{quantity} item{quantity > 1 ? 's' : ''}</span>
                            </div>
                        </div>

                        {/* Cart Item */}
                        {yacht ? (
                            <div className="px-8 py-6">
                                <div className="flex gap-6">
                                    {/* Yacht Image */}
                                    <div className="relative w-32 h-24 rounded-xl overflow-hidden shrink-0 border border-black/5">
                                        <Image src={yacht.image} alt={yacht.title} fill className="object-cover" />
                                    </div>

                                    {/* Yacht Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold font-jakarta text-textMain">{yacht.title}</h3>
                                        <div className="mt-2 space-y-1 text-sm text-textMuted">
                                            <p className="flex items-center gap-2">
                                                <CalendarDays className="w-3.5 h-3.5 text-gold" />
                                                Booking Date: {formatDate(bookingData?.date)}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-gold" />
                                                Time: {formatTime(bookingData?.time)} / Duration: {bookingData?.duration || '2 Hours'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Users className="w-3.5 h-3.5 text-gold" />
                                                Guests: {bookingData?.guests || '--'}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-gold" />
                                                Zone: Asia/Kolkata
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="mt-4 flex items-center gap-3">
                                            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors">
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-10 text-center font-bold text-textMain">{quantity}</span>
                                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors">
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right shrink-0">
                                        <p className="text-xl font-black font-jakarta text-textMain">₹{basePrice.toLocaleString()}</p>
                                        <p className="text-xs text-textMuted mt-1">{yacht.price}/hr × {getHours()} hrs</p>
                                        {addonCost > 0 && (
                                            <p className="text-xs text-gold mt-2 font-semibold">+ ₹{addonCost.toLocaleString()} ({bookingData?.addon})</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="px-8 py-12 text-center text-textMuted">
                                <Ship className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p>No yacht selected. Go back to the fleet page to choose one.</p>
                            </div>
                        )}

                        {/* Subtotal & Proceed */}
                        <div className="px-8 py-6 border-t border-black/5 bg-[#FAFBFC]">
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-lg font-bold font-jakarta text-textMain">Subtotal</span>
                                <span className="text-2xl font-black font-jakarta text-textMain">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!yacht}
                                className="w-full bg-[#10233D] hover:bg-[#0c1b2f] text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:-translate-y-0.5"
                            >
                                Proceed To Checkout
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════ STEP 2: CHECKOUT ═══════════════════ */}
                {step === 2 && (
                    <form onSubmit={handlePayment} className="space-y-6">

                        {/* Information Section */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                            <h2 className="text-xl font-bold font-jakarta text-textMain mb-6">Information</h2>
                            <label className="block">
                                <input type="email" className={inputClass} placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)} />
                            </label>
                        </div>

                        {/* Billing Address */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                            <h2 className="text-xl font-bold font-jakarta text-textMain mb-6">Billing Address</h2>
                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input type="text" className={inputClass} placeholder="First name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    <input type="text" className={inputClass} placeholder="Last name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                                </div>

                                {!showCompany ? (
                                    <button type="button" onClick={() => setShowCompany(true)} className="text-sm font-semibold text-gold hover:underline flex items-center gap-1">
                                        <Plus className="w-3.5 h-3.5" /> Add Company (optional)
                                    </button>
                                ) : (
                                    <input type="text" className={inputClass} placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
                                )}

                                <input type="text" className={inputClass} placeholder="Street address" required value={address} onChange={e => setAddress(e.target.value)} />

                                {!showAddress2 ? (
                                    <button type="button" onClick={() => setShowAddress2(true)} className="text-sm font-semibold text-gold hover:underline flex items-center gap-1">
                                        <Plus className="w-3.5 h-3.5" /> Add Address Line 2 (optional)
                                    </button>
                                ) : (
                                    <input type="text" className={inputClass} placeholder="Apartment, suite, etc." value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-textMuted mb-1.5">Country / Region *</label>
                                        <select className={inputClass} value={country} onChange={e => setCountry(e.target.value)} required>
                                            <option value="India">India</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Singapore">Singapore</option>
                                        </select>
                                    </div>
                                    <input type="text" className={inputClass} placeholder="State / Province (optional)" value={state} onChange={e => setState(e.target.value)} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input type="text" className={inputClass} placeholder="Town / City" required value={city} onChange={e => setCity(e.target.value)} />
                                    <input type="text" className={inputClass} placeholder="PIN Code" value={pincode} onChange={e => setPincode(e.target.value)} />
                                </div>

                                <input type="tel" className={inputClass} placeholder="Phone" required value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                            <h2 className="text-xl font-bold font-jakarta text-textMain mb-2">Payment</h2>
                            <p className="text-sm text-textMuted mb-6">All transactions are secure and encrypted.</p>

                            <div className="space-y-3">
                                {/* Razorpay option */}
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-gold bg-gold/5' : 'border-black/10 hover:border-black/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="accent-gold w-4 h-4" />
                                        <span className="font-semibold text-textMain">Credit / Debit Cards</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-textMuted" />
                                        <span className="text-[10px] font-bold text-white bg-[#1A1F71] px-1.5 py-0.5 rounded">VISA</span>
                                        <span className="text-[10px] font-bold text-white bg-[#EB001B] px-1.5 py-0.5 rounded">MC</span>
                                        <span className="text-[10px] font-bold text-white bg-[#006FCF] px-1.5 py-0.5 rounded">AMEX</span>
                                    </div>
                                </label>

                                {/* UPI option */}
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-gold bg-gold/5' : 'border-black/10 hover:border-black/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-gold w-4 h-4" />
                                        <span className="font-semibold text-textMain">UPI / Google Pay / PhonePe</span>
                                    </div>
                                    <Smartphone className="w-5 h-5 text-textMuted" />
                                </label>

                                {/* Net Banking option */}
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-gold bg-gold/5' : 'border-black/10 hover:border-black/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="accent-gold w-4 h-4" />
                                        <span className="font-semibold text-textMain">Net Banking</span>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 text-textMuted" />
                                </label>
                            </div>
                        </div>

                        {/* Order Summary Bar */}
                        <div className="bg-[#10233D] rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-white/60">Order Summary</span>
                                <button type="button" onClick={() => setStep(1)} className="text-xs text-gold font-semibold hover:underline">Edit Cart</button>
                            </div>

                            {yacht && (
                                <div className="flex gap-4 mb-5 pb-5 border-b border-white/10">
                                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                                        <Image src={yacht.image} alt={yacht.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm">{yacht.title}</p>
                                        <p className="text-xs text-white/50 mt-0.5">{formatDate(bookingData?.date)} • {formatTime(bookingData?.time)}</p>
                                    </div>
                                    <p className="font-bold text-sm shrink-0">₹{(basePrice + addonCost).toLocaleString()}</p>
                                </div>
                            )}

                            <div className="space-y-2 text-sm mb-5">
                                <div className="flex justify-between">
                                    <span className="text-white/60">Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Tax & Fees</span>
                                    <span className="text-white/40">Included</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/10 mb-6">
                                <span className="text-lg font-bold font-jakarta">Total</span>
                                <span className="text-2xl font-black text-gold font-jakarta">₹{subtotal.toLocaleString()}</span>
                            </div>

                            <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-[#10233D] font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(200,164,93,0.3)] hover:shadow-[0_4px_25px_rgba(200,164,93,0.5)] hover:-translate-y-0.5">
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                Pay ₹{subtotal.toLocaleString()} Securely
                            </button>

                            <p className="text-center text-[10px] text-white/30 mt-4 leading-relaxed">
                                By proceeding, you agree to our Cancellation Policy and Terms of Service. Final itinerary confirmation subject to availability.
                            </p>
                        </div>
                    </form>
                )}

            </div>
        </main>
    );
}
