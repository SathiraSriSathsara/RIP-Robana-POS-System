interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

interface POSReceiptProps {
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
}

export default function POSReceipt({ items, subtotal, discount, total }: POSReceiptProps) {
  return (
    <div className="border-2 border-white rounded-2xl p-6 space-y-4 bg-black">
      {/* Product Image Placeholder */}
      <div className="border-2 border-white rounded-lg aspect-square flex items-center justify-center mb-4">
        <div className="text-white/50 text-5xl font-light">✕</div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm text-center border-b border-white pb-4 font-light">
        <p>Address</p>
        <p>Phone</p>
      </div>

      {/* Date & Receipt */}
      <div className="text-xs space-y-1 border-b border-white pb-4 font-light">
        <p>Date: 2024-10-06 Time: 10:30 AM</p>
        <p>Receipt No: 1457234043</p>
      </div>

      {/* Items Table */}
      <div className="text-xs space-y-1 border-b border-white pb-4 font-light">
        <div className="grid grid-cols-4 gap-2 border-b border-dashed border-white pb-2 mb-2">
          <span>Name</span>
          <span>QTY</span>
          <span>Discount</span>
          <span>Price</span>
        </div>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-4 gap-2">
            <span className="truncate">{item.name}</span>
            <span className="text-center">{item.qty}</span>
            <span className="text-center">Rs.100</span>
            <span className="text-center">{item.price}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 text-sm font-light">
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>- {discount}.00</span>
        </div>
        <div className="flex justify-between border-t-2 border-white pt-3">
          <span>Sub Total:</span>
          <span className="border-b-2 border-white pb-1">Rs.{total}.00</span>
        </div>
      </div>
    </div>
  )
}
