"use client"

import { useState } from "react"
import { getRestaurantData, getProducts, getTables } from "@/lib/restaurant-data"
import POSHeader from "@/components/pos-header"
import POSCategoryModal from "@/components/pos-category-modal"
import POSProductGrid from "@/components/pos-product-grid"
import POSCart from "@/components/pos-cart"
import POSCheckout from "@/components/pos-checkout"
import POSTableMap from "@/components/pos-table-map"
import { Menu } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"

export default function POSPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null)
  const [cartItems, setCartItems] = useState<Array<any>>([])
  const [activeView, setActiveView] = useState<"order" | "map">("order")
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const restaurantData = getRestaurantData()
  const allProducts = getProducts()

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || p.category === selectedCategory
    const matchesSubCategory = selectedSubCategory === null || p.subCategory === selectedSubCategory
    return matchesSearch && matchesCategory && matchesSubCategory
  })

  const addToCart = (product: (typeof allProducts)[0]) => {
    const existing = cartItems.find((item) => item.id === product.id)
    if (existing) {
      updateQty(product.id, existing.qty + 1)
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }])
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQty = (id: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, qty: newQty } : item)))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const serviceCharge = Math.round(subtotal * (restaurantData.restaurant.serviceCharge / 100))
  const total = subtotal + serviceCharge

  return (
    <div className="min-h-screen bg-background">
      <POSHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "order" | "map")} className="w-full">
        <div className="sticky top-16 bg-card border-b border-border z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView("order")}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeView === "order"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Ordering
              </button>
              <button
                onClick={() => setActiveView("map")}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeView === "map"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Restaurant Map
              </button>
            </div>
          </div>
        </div>

        {activeView === "order" ? (
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative">
              <div className="md:col-span-3 space-y-3 sm:space-y-4">
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  Categories
                </button>

                <POSProductGrid products={filteredProducts} onAddToCart={addToCart} />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <POSCart items={cartItems} onQtyChange={updateQty} onRemove={removeItem} />
                <POSCheckout subtotal={subtotal} serviceCharge={serviceCharge} total={total} cartItems={cartItems} />
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-6">
            <POSTableMap tables={getTables()} />
          </div>
        )}
      </Tabs>

      <POSCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onCategoryChange={setSelectedCategory}
        onSubCategoryChange={setSelectedSubCategory}
      />
    </div>
  )
}
