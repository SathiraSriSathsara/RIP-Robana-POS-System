"use client"

import { getCategories } from "@/lib/restaurant-data"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface POSCategoryNavProps {
  selectedCategory: number | null
  selectedSubCategory: number | null
  onCategoryChange: (id: number | null) => void
  onSubCategoryChange: (id: number | null) => void
}

export default function POSCategoryNav({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}: POSCategoryNavProps) {
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

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase">Categories</h3>
      <div className="grid grid-cols-1 gap-2">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            {/* Main Category Button */}
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                selectedCategory === category.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border text-foreground hover:border-primary/50"
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
  )
}
