import * as React from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ColumnDef<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: ColumnDef<T>[]
    data: T[]
    onRowClick?: (row: T) => void
    searchPlaceholder?: string
    searchValue?: string
    onSearchChange?: (value: string) => void
    toolbar?: React.ReactNode
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    onRowClick,
    searchPlaceholder = "Search records...",
    searchValue,
    onSearchChange,
    toolbar
}: DataTableProps<T>) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={searchPlaceholder}
                        className="pl-8"
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                    {toolbar}
                </div>
            </div>

            <div className="rounded-md border">
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {columns.map((col) => (
                                    <th
                                        key={col.key.toString()}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="p-4 text-center align-middle text-muted-foreground"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() => onRowClick?.(row)}
                                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                                    >
                                        {columns.map((col) => (
                                            <td key={col.key.toString()} className="p-4 align-middle">
                                                {col.render ? col.render(row) : String(row[col.key as keyof T])}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing 1 to {data.length} of {data.length} records.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
