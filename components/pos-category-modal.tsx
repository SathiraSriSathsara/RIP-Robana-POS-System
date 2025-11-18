"use client"

import { getCategories } from "@/lib/restaurant-data"
import { ChevronDown, X } from "lucide-react"
import { useState } from "react"

interface POSCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: number | null
  selectedSubCategory: number | null
  onCategoryChange: (id: number | null) => void
  onSubCategoryChange: (id: number | null) => void
}

export default function POSCategoryModal({
  isOpen,
  onClose,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}: POSCategoryModalProps) {
  const categories = getCategories()
  const [expandedCategory, setExpandedCategory] = useState<number | null>(selectedCategory)

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      onCategoryChange(null)
      setExpandedCategory(null)
      onSubCategoryChange(null)
    } else {
      onCategoryChange(categoryId)
      setExpandedCategory(categoryId)
      onSubCategoryChange(null)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-screen w-full max-w-sm bg-card border-l border-border z-50 overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Select Category</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              {/* Main Category Button */}
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                {category.subCategories.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedCategory === category.id ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* Sub Categories */}
              {category.subCategories.length > 0 && expandedCategory === category.id && (
                <div className="pl-4 space-y-2">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => onSubCategoryChange(subCategory.id)}
                      className={`w-full px-4 py-2 rounded-lg border text-sm transition-all ${
                        selectedSubCategory === subCategory.id
                          ? "bg-secondary/20 border-secondary text-secondary-foreground font-medium"
                          : "bg-background border-border text-foreground hover:border-secondary/50"
                      }`}
                    >
                      {subCategory.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
