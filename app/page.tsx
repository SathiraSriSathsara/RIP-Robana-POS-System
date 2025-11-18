"use client"

import { useEffect, useState } from "react"
import {
  getRestaurantData,
  getProducts,
  getTables,
  getCategories,
} from "@/lib/restaurant-data"
import { RestaurantResponse, Product, Table, Category } from "@/lib/types"

import POSHeader from "@/components/pos-header"
import POSCategoryModal from "@/components/pos-category-modal"
import POSProductGrid from "@/components/pos-product-grid"
import POSCart from "@/components/pos-cart"
import POSCheckout from "@/components/pos-checkout"
import POSTableMap from "@/components/pos-table-map"
import { Menu } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"

export default function POSPage() {
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [restaurantData, setRestaurantData] = useState<RestaurantResponse | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [activeView, setActiveView] = useState<"order" | "map">("order")
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getRestaurantData()
        const prod = await getProducts()
        const tbl = await getTables()
        const cat = await getCategories()

        setRestaurantData(data)
        setProducts(prod)
        setTables(tbl)
        setCategories(cat)
      } catch (err) {
        console.error("Error loading data:", err)
        setHasError(true)

        // fallback to empty arrays so UI still renders
        setRestaurantData({
          restaurant: { name: "No Restaurant Data", currency: "N/A", serviceCharge: 0 },
          categories: [],
          products: [],
          tables: []
        })
        setProducts([])
        setTables([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading POS...</div>
  }

  // -----------------------------
  // FILTERED PRODUCTS
  // -----------------------------
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || p.category === selectedCategory
    const matchesSubCategory = selectedSubCategory === null || p.subCategory === selectedSubCategory
    return matchesSearch && matchesCategory && matchesSubCategory
  })

  // -----------------------------
  // CART FUNCTIONS
  // -----------------------------
  const addToCart = (product: Product) => {
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
    if (newQty <= 0) return removeItem(id)
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const serviceCharge = Math.round(subtotal * ((restaurantData?.restaurant.serviceCharge || 0) / 100))
  const total = subtotal + serviceCharge

  return (
    <div className="min-h-screen bg-background">
      <POSHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {hasError && (
        <div className="p-4 text-center text-red-600">
          Failed to connect to API. Showing fallback data.
        </div>
      )}

      <Tabs
        value={activeView}
        onValueChange={(value) => setActiveView(value as "order" | "map")}
        className="w-full"
      >
        {/* NAVIGATION */}
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

        {/* ORDERING VIEW */}
        {activeView === "order" ? (
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative">
              {/* LEFT SECTION (PRODUCTS, CATEGORY BUTTON) */}
              <div className="md:col-span-3 space-y-3 sm:space-y-4">
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  Categories
                </button>

                {filteredProducts.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">No products found</div>
                ) : (
                  <POSProductGrid products={filteredProducts} onAddToCart={addToCart} />
                )}
              </div>

              {/* RIGHT SECTION (CART + CHECKOUT) */}
              <div className="space-y-3 sm:space-y-4">
                <POSCart items={cartItems} onQtyChange={updateQty} onRemove={removeItem} />
                <POSCheckout subtotal={subtotal} serviceCharge={serviceCharge} total={total} cartItems={cartItems} />
              </div>
            </div>
          </div>
        ) : (
          // MAP VIEW
          <div className="container mx-auto px-4 py-6">
            {tables.length === 0 ? (
              <div className="text-center text-muted-foreground">No table data found</div>
            ) : (
              <POSTableMap tables={tables} />
            )}
          </div>
        )}
      </Tabs>

      {/* CATEGORY MODAL */}
      <POSCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        categories={categories}
        onCategoryChange={setSelectedCategory}
        onSubCategoryChange={setSelectedSubCategory}
      />
    </div>
  )
}
