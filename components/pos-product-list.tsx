"use client"

import { Minus, Plus, X } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

interface POSProductListProps {
  items: CartItem[]
  onQtyChange: (id: number, qty: number) => void
  onRemove: (id: number) => void
}

export default function POSProductList({ items, onQtyChange, onRemove }: POSProductListProps) {
  return (
    <div className="space-y-4 border-b border-white pb-6">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b-2 border-white text-sm font-light">
        <div className="col-span-4">Product Name</div>
        <div className="col-span-3 text-center">QTY</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Amount</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
            <div className="col-span-4 text-cyan-400 font-light">{item.name}</div>

            {/* Quantity Control */}
            <div className="col-span-3 flex items-center justify-center gap-3">
              <button
                onClick={() => onQtyChange(item.id, item.qty - 1)}
                className="border border-white rounded p-1 hover:bg-white/10 w-8 h-8 flex items-center justify-center transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="border-2 border-white rounded w-10 h-10 flex items-center justify-center font-light">
                {item.qty}
              </div>
              <button
                onClick={() => onQtyChange(item.id, item.qty + 1)}
                className="border border-white rounded p-1 hover:bg-white/10 w-8 h-8 flex items-center justify-center transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="col-span-2 border-2 border-white rounded px-3 py-2 text-center text-sm font-light">
              {item.price}.00
            </div>

            {/* Amount */}
            <div className="col-span-2 text-center font-light">{(item.price * item.qty).toFixed(2)}</div>

            {/* Delete */}
            <div className="col-span-1 flex justify-center">
              <button onClick={() => onRemove(item.id)} className="hover:opacity-70 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
