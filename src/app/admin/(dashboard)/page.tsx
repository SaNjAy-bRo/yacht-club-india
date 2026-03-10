"use client"

import { useEffect, useState } from "react"
import { Users, DollarSign, Activity, ShoppingCart } from "lucide-react"

import { StatCard } from "@/components/admin/StatCard"
import { DataTable } from "@/components/admin/DataTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Types for Booking
type Booking = {
    id: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_email: string;
    yacht_title: string;
    booking_date: string;
    status: string;
    subtotal: number;
    created_at: string;
    customer_phone?: string;
    customer_company?: string;
    guests?: number;
    total_hours?: number;
    charter_cost?: number;
    addons_cost?: number;
    time_slot?: string;
    addons?: string[];
}

// Ensure the mapped key exists for the DataTable
type BookingRow = Booking & { customer_name: string; formatted_price: string };

export default function AdminDashboardPage() {
    const [bookings, setBookings] = useState<BookingRow[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings');
                const data = await res.json();
                if (data.success) {
                    const formatted = data.bookings.map((b: any) => ({
                        ...b,
                        customer_name: `${b.customer_first_name} ${b.customer_last_name}`,
                        formatted_price: `₹${Number(b.subtotal).toLocaleString()}`
                    }));
                    setBookings(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleTogglePaid = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'paid' ? 'pending' : 'paid';

        // Optimistic UI update
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

        try {
            const res = await fetch('/api/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                // Revert if failed
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status: currentStatus } : b));
                alert('Failed to update status.');
            }
        } catch (err) {
            console.error('Failed to patch status:', err);
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: currentStatus } : b));
            alert('Error updating status.');
        }
    };

    const columns: { key: keyof BookingRow | "status"; label: string; render?: (row: BookingRow) => React.ReactNode }[] = [
        { key: "customer_name", label: "Customer" },
        { key: "customer_email", label: "Email" },
        { key: "yacht_title", label: "Yacht" },
        { key: "booking_date", label: "Date" },
        { key: "formatted_price", label: "Amount" },
        {
            key: "status",
            label: "Paid Status",
            render: (row) => (
                <label className="flex items-center gap-2 cursor-pointer no-print" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={row.status === 'paid'}
                        onChange={() => handleTogglePaid(row.id, row.status)}
                        className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                    />
                    <span className={`text-sm font-medium ${row.status === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
                        {row.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                </label>
            )
        },
    ]

    const totalRevenue = bookings.filter(b => b.status === 'paid').reduce((sum: number, b: BookingRow) => sum + (Number(b.subtotal) || 0), 0);
    const pendingRequests = bookings.filter((b: BookingRow) => b.status === 'pending').length;

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    description="all time"
                />
                <StatCard
                    title="Total Bookings"
                    value={bookings.length.toString()}
                    icon={ShoppingCart}
                    description="total requests received"
                />
                <StatCard
                    title="Pending Requests"
                    value={pendingRequests.toString()}
                    icon={Activity}
                    description="awaiting confirmation"
                />
                <StatCard
                    title="Customers"
                    value={new Set(bookings.map((b: BookingRow) => b.customer_email)).size.toString()}
                    icon={Users}
                    description="unique emails"
                />
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                        A quick overview of the latest booking requests. Click a row to see full details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading bookings...</div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={bookings}
                            searchPlaceholder="Search bookings..."
                            onRowClick={(row) => setSelectedBooking(row)}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                                <p className="text-sm text-gray-500 mt-1">ID: {selectedBooking.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Customer Info */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Customer Information</h4>
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 relative overflow-hidden">
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                                            <span className="text-gray-500 text-sm">Name</span>
                                            <span className="font-medium text-gray-900">{selectedBooking.customer_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                                            <span className="text-gray-500 text-sm">Email</span>
                                            <a href={`mailto:${selectedBooking.customer_email}`} className="font-medium text-blue-600 hover:underline">{selectedBooking.customer_email}</a>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                                            <span className="text-gray-500 text-sm">Phone</span>
                                            <a href={`tel:${selectedBooking.customer_phone}`} className="font-medium text-blue-600 hover:underline">{selectedBooking.customer_phone || 'N/A'}</a>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-sm">Company</span>
                                            <span className="font-medium text-gray-900">{selectedBooking.customer_company || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Info */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Trip Details</h4>
                                    <div className="bg-[#10233D]/5 rounded-xl p-4 space-y-3 relative overflow-hidden">
                                        <div className="flex justify-between items-center pb-2 border-b border-[#10233D]/10">
                                            <span className="text-gray-500 text-sm">Yacht</span>
                                            <span className="font-bold text-[#10233D]">{selectedBooking.yacht_title}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-[#10233D]/10">
                                            <span className="text-gray-500 text-sm">Date</span>
                                            <span className="font-medium text-gray-900">{new Date(selectedBooking.booking_date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-[#10233D]/10">
                                            <span className="text-gray-500 text-sm">Time Slot</span>
                                            <span className="font-medium text-gray-900 capitalize">{selectedBooking.time_slot}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-1">
                                            <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                                                <span className="block text-xs text-gray-500 mb-1">Guests</span>
                                                <span className="block font-bold text-gray-900">{selectedBooking.guests || 0}</span>
                                            </div>
                                            <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                                                <span className="block text-xs text-gray-500 mb-1">Duration</span>
                                                <span className="block font-bold text-gray-900">{selectedBooking.total_hours || 0} hrs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add-ons & Pricing */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Financials & Extras</h4>
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <div className="p-4 space-y-3 bg-white">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Base Charter Cost</span>
                                            <span className="font-medium">₹{(Number(selectedBooking.charter_cost) || 0).toLocaleString()}</span>
                                        </div>

                                        {/* Addons List */}
                                        {selectedBooking.addons && Array.isArray(selectedBooking.addons) && selectedBooking.addons.length > 0 && (
                                            <div className="py-2 pl-4 border-l-2 border-gray-100 space-y-2">
                                                <span className="text-xs text-gray-400 block mb-1">Selected Add-ons</span>
                                                {selectedBooking.addons.map((addon: string, idx: number) => (
                                                    <div key={idx} className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-600 flex items-center gap-2">
                                                            <div className="w-1 h-1 bg-gold rounded-full"></div>
                                                            <span className="capitalize">{addon.replace(/-/g, ' ')}</span>
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between items-center pt-2 mt-2 border-t border-dashed border-gray-200">
                                                    <span className="text-xs text-gray-500">Add-ons Total</span>
                                                    <span className="text-sm font-medium">₹{(Number(selectedBooking.addons_cost) || 0).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <span className="font-bold text-gray-900">Total Amount</span>
                                            <span className="text-xl font-black text-gold">₹{(Number(selectedBooking.subtotal) || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className={`p-4 flex justify-between items-center ${selectedBooking.status === 'paid' ? 'bg-green-50' : 'bg-orange-50'}`}>
                                        <span className={`font-medium ${selectedBooking.status === 'paid' ? 'text-green-800' : 'text-orange-800'}`}>Current Status</span>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${selectedBooking.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {selectedBooking.status.toUpperCase()}
                                            </span>
                                            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg shadow-sm border border-black/5 hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBooking.status === 'paid'}
                                                    onChange={async () => {
                                                        await handleTogglePaid(selectedBooking.id, selectedBooking.status);
                                                        // Update local modal state to reflect the optimistic update
                                                        setSelectedBooking(prev => prev ? { ...prev, status: prev.status === 'paid' ? 'pending' : 'paid' } : null)
                                                    }}
                                                    className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Mark as {selectedBooking.status === 'paid' ? 'Pending' : 'Paid'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
