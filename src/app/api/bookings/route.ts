import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Ensure we have a payload to work with
        if (!body || !body.customer) {
            return NextResponse.json({ error: 'Invalid booking payload provided.' }, { status: 400 });
        }

        const {
            yacht,
            yachtId,
            date,
            timeSlot,
            guests,
            extraHours,
            addons,
            hours,
            charterCost,
            addonsCost,
            quantity,
            subtotal,
            customer,
        } = body;

        // Note: For now, we stringify the JSON fields arrays/objects if the Supabase table doesn't support JSONB yet,
        // but it's recommended to create a JSONB column in Supabase for `addons` and `customer_details`.
        // We'll pass the JSON directly assuming Supabase handles it if the columns are JSONB.

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .insert([
                {
                    yacht_title: yacht,
                    yacht_id: yachtId,
                    booking_date: date,
                    time_slot: timeSlot,
                    guests: parseInt(guests) || 0,
                    extra_hours: extraHours || 0,
                    addons: addons || [],
                    total_hours: hours,
                    charter_cost: charterCost,
                    addons_cost: addonsCost,
                    quantity: quantity || 1,
                    subtotal: subtotal,
                    customer_first_name: customer.firstName,
                    customer_last_name: customer.lastName,
                    customer_email: customer.email,
                    customer_phone: customer.phone,
                    customer_company: customer.company || '',
                    status: 'pending' // default status
                }
            ])
            .select();

        if (error) {
            console.error('Error inserting booking to Supabase:', error);
            return NextResponse.json({
                error: 'Failed to process booking submission',
                details: error.message,
                code: error.code
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, booking: data?.[0] || null }, { status: 201 });
    } catch (err: any) {
        console.error('Server error handling booking POST:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings from Supabase:', error);
            return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
        }

        return NextResponse.json({ success: true, bookings: data || [] }, { status: 200 });
    } catch (err: any) {
        console.error('Server error handling booking GET:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status.' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating booking status:', error);
            return NextResponse.json({ error: 'Failed to update booking status.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, booking: data?.[0] || null }, { status: 200 });

    } catch (err: any) {
        console.error('Server error handling booking PATCH:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
