"use client"

import { useState } from "react"
import { Printer, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  image: string
}

interface POSCheckoutProps {
  subtotal: number
  serviceCharge: number
  total: number
  cartItems: CartItem[]
}

export default function POSCheckout({ subtotal, serviceCharge, total, cartItems }: POSCheckoutProps) {
  const [showTableDialog, setShowTableDialog] = useState(false)
  const [tableNumber, setTableNumber] = useState("")
  const [orderType, setOrderType] = useState<"KOT" | "BOT" | null>(null)

  const handlePrintKOT = () => {
    setOrderType("KOT")
    setShowTableDialog(true)
  }

  const handlePrintBOT = () => {
    setOrderType("BOT")
    setShowTableDialog(true)
  }

  const confirmPrint = () => {
    if (!tableNumber.trim()) {
      alert("Please enter a table number")
      return
    }

    const orderTypeText = orderType === "KOT" ? "KITCHEN ORDER TICKET" : "BAR ORDER TICKET"
    const receiptHTML = `
      <html>
        <head>
          <style>
            body { font-family: monospace; width: 80mm; margin: 0; }
            .header { text-align: center; font-weight: bold; margin-bottom: 10px; }
            .table-num { text-align: center; font-size: 14px; margin: 10px 0; }
            .items { margin: 10px 0; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .line { border-top: 1px dashed #000; margin: 10px 0; }
            .total { text-align: center; font-weight: bold; margin: 10px 0; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="header">${orderTypeText}</div>
          <div class="table-num">TABLE: ${tableNumber}</div>
          <div class="line"></div>
          <div class="items">
            ${cartItems.map((item) => `<div class="item"><span>${item.name} x${item.qty}</span></div>`).join("")}
          </div>
          <div class="line"></div>
          <div class="total">Order Placed</div>
          <div style="text-align: center; font-size: 12px; margin-top: 10px;">
            ${new Date().toLocaleString()}
          </div>
        </body>
      </html>
    `

    const printWindow = window.open("", "", "width=300,height=400")
    if (printWindow) {
      printWindow.document.write(receiptHTML)
      printWindow.document.close()
      printWindow.print()
    }

    setShowTableDialog(false)
    setTableNumber("")
    setOrderType(null)
  }

  const isEmpty = cartItems.length === 0

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 space-y-4 sticky top-32">
        {/* Totals */}
        <div className="space-y-3 text-sm border-b border-border pb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Charge (10%)</span>
            <span className="font-medium">Rs. {serviceCharge.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span className="text-primary">Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handlePrintKOT}
            disabled={isEmpty}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print KOT
          </button>
          <button
            onClick={handlePrintBOT}
            disabled={isEmpty}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print BOT
          </button>
          <button
            disabled={isEmpty}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4" />
            Complete Order
          </button>
        </div>
      </div>

      {/* Table Selection Dialog */}
      <Dialog open={showTableDialog} onOpenChange={setShowTableDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{orderType === "KOT" ? "Kitchen Order Ticket" : "Bar Order Ticket"}</DialogTitle>
            <DialogDescription>Enter the table number for this order</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Table number (e.g., 5)"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              min="1"
              max="99"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowTableDialog(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={confirmPrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print & Send
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
