'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin', 'layout')
    redirect('/admin')
}

export async function resetPassword(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        return { error: 'Email is required' }
    }

    const supabase = await createClient()

    // Assuming the application is running on localhost:3000 for dev
    // For prod, this should be an env variable like NEXT_PUBLIC_SITE_URL
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/api/auth/callback?next=/admin/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for the password reset link' }
}

export async function updatePassword(formData: FormData) {
    const password = formData.get('password') as string

    if (!password) {
        return { error: 'Password is required' }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
        password
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin', 'layout')
    redirect('/admin')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/admin/login')
}
