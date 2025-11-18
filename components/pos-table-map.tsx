"use client"

import type { Table } from "@/lib/restaurant-data"

interface POSTableMapProps {
  tables: Table[]
}

export default function POSTableMap({ tables }: POSTableMapProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Restaurant Floor Plan</h2>
        <p className="text-sm text-muted-foreground">
          Visual representation of table availability and seating capacity
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <div className="relative bg-yellow-50 rounded-lg p-8 min-h-96 border-2 border-dashed border-border">
          {/* Floor Plan Title */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-muted-foreground uppercase">
            Entrance
          </div>

          {/* Tables Grid */}
          <div className="relative h-80 w-full">
            {tables.map((table) => (
              <div
                key={table.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${table.x}px`,
                  top: `${table.y}px`,
                }}
              >
                <div
                  className={`
                    w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-sm
                    transition-all transform hover:scale-110
                    ${
                      table.status === "available"
                        ? "bg-green-100 border-2 border-green-500 text-green-700"
                        : "bg-red-100 border-2 border-red-500 text-red-700"
                    }
                  `}
                >
                  <span className="text-lg">Table</span>
                  <span className="text-2xl font-bold">{table.number}</span>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                  <span>
                    {table.capacity} pax • {table.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-green-500"></div>
            <span className="text-foreground font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-red-500"></div>
            <span className="text-foreground font-medium">Occupied</span>
          </div>
        </div>
      </div>
    </div>
  )
}
