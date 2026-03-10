"use client"

import { Menu, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AdminHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>

            <div className="w-full flex-1">
                {/* Placeholder for Breadcrumbs or Search */}
                <h1 className="text-lg font-semibold md:text-xl">Dashboard Overview</h1>
            </div>

            <div className="flex items-center gap-4">
                <form action={async () => {
                    const { logout } = await import('@/app/admin/actions');
                    await logout();
                }}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </form>
            </div>
        </header>
    )
}
