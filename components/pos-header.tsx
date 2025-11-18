"use client"

import { Search, UtensilsCrossed } from "lucide-react"

interface POSHeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function POSHeader({ searchTerm, onSearchChange }: POSHeaderProps) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PositiQ</h1>
              <p className="text-xs text-muted-foreground">Restaurant POS</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Date & Time */}
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{time}</p>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
