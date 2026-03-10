import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <main className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-[#F7F8FA]">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl text-center max-w-lg mx-auto border border-black/5">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black font-jakarta text-[#10233D] mb-4">
                    Booking Request Received
                </h1>
                <p className="text-textMuted mb-8 text-lg leading-relaxed">
                    Thank you for choosing us. We have received your request and our team will call you shortly to confirm your booking and details.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-[#10233D] hover:bg-[#0c1b2f] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                    Return to Homepage
                </Link>
            </div>
        </main>
    );
}
