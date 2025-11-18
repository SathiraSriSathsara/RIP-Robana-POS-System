import { Plus } from "lucide-react"

export default function POSUserSection() {
  return (
    <div className="border border-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 min-h-32">
        {/* User Icon */}
        <div className="border-r border-white flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-4xl mb-2">👤</div>
            <p className="text-sm font-light">User</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border-r border-white p-4 flex flex-col justify-center space-y-2 font-light text-sm">
          <p>Customer ID:</p>
          <p>Customer name:</p>
          <p>Customer Address:</p>
        </div>

        {/* Summary */}
        <div className="p-4 flex flex-col justify-center space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-light">Discount:</span>
            <span>- 200.00</span>
          </div>
          <div className="flex justify-between items-center border-t border-white pt-3">
            <span className="font-light">Sub Total:</span>
            <span>Rs.480.00</span>
          </div>
          <button className="flex items-center justify-center gap-2 border border-white rounded-lg py-2 hover:bg-white/10 text-sm">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
