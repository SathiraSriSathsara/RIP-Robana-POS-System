"use client"

import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  image: string
}

interface POSCartProps {
  items: CartItem[]
  onQtyChange: (id: number, qty: number) => void
  onRemove: (id: number) => void
}

export default function POSCart({ items, onQtyChange, onRemove }: POSCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 sticky top-32">
      <h2 className="font-semibold text-foreground text-sm">Order Summary</h2>

      {items.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-muted-foreground">Your order is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 sm:gap-2 bg-background/50 p-2 sm:p-2.5 rounded-lg hover:bg-background transition-colors"
              >
                <span className="text-lg sm:text-xl w-6 sm:w-8">{item.image}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs text-foreground truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">Rs. {(item.price * item.qty).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1">
                  <button
                    onClick={() => onQtyChange(item.id, item.qty - 1)}
                    className="p-0.5 sm:p-1 hover:bg-destructive/20 rounded transition-colors"
                  >
                    <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                  <span className="w-5 text-center font-medium text-xs">{item.qty}</span>
                  <button
                    onClick={() => onQtyChange(item.id, item.qty + 1)}
                    className="p-0.5 sm:p-1 hover:bg-primary/20 rounded transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="p-0.5 sm:p-1 hover:bg-destructive/20 rounded transition-colors text-destructive"
                >
                  <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-2.5 sm:pt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items:</span>
              <span className="font-medium">{items.reduce((sum, item) => sum + item.qty, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
