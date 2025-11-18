"use client"

import { Plus } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  category: number
  subCategory: number | null
  image: string
}

interface POSProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export default function POSProductGrid({ products, onAddToCart }: POSProductGridProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-lg font-semibold text-foreground">Products</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{products.length} items</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-lg text-center py-8 sm:py-12">
          <p className="text-xs sm:text-sm text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-card border border-border rounded-lg p-2.5 sm:p-4 hover:border-primary hover:bg-primary/5 transition-all group text-left"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">{product.image}</span>
                <div className="bg-primary text-primary-foreground p-1 sm:p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1">{product.name}</h3>
              <p className="text-base sm:text-lg font-bold text-primary">Rs. {product.price.toLocaleString()}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
