import { Percent, Settings, Trash2 } from "lucide-react"

export default function POSActionButtons() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Top Row - Icon Buttons */}
      <div className="col-span-2 grid grid-cols-3 gap-4">
        <button className="border-2 border-white rounded-2xl py-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition bg-black">
          <Trash2 className="w-6 h-6" />
          <span className="text-xs font-light">Cash drawer</span>
        </button>
        <button className="border-2 border-white rounded-2xl py-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition bg-black">
          <Percent className="w-6 h-6" />
          <span className="text-xs font-light">Discount</span>
        </button>
        <button className="border-2 border-white rounded-2xl py-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition bg-black">
          <Settings className="w-6 h-6" />
          <span className="text-xs font-light">Settings</span>
        </button>
      </div>

      {/* Payment Button */}
      <button className="border-2 border-white rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-white/10 transition bg-black">
        <span className="text-lg font-light">Payment</span>
        <div className="border border-white rounded p-1">✓</div>
      </button>

      {/* Cancel Button */}
      <button className="border-2 border-white rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-white/10 transition bg-black col-span-3">
        <span className="text-lg font-light">Cancel</span>
        <div className="border border-white rounded p-1">✕</div>
      </button>
    </div>
  )
}
