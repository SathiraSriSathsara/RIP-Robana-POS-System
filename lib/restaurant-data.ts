import {
  RestaurantResponse,
  Category,
  SubCategory,
  Product,
  Table
} from "./types"

// optional in–memory cache to avoid refetching
let cachedData: RestaurantResponse | null = null

// --- MAIN FETCH FUNCTION ---
export async function fetchRestaurantData(): Promise<RestaurantResponse> {
  if (cachedData) return cachedData

  const res = await fetch("https://your-api.com/restaurant-data", {
    cache: "no-store" // prevents Next.js caching
  })

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant data")
  }

  const data = await res.json()
  cachedData = data
  return data
}

// --- DATA HELPERS ---

export async function getRestaurantData(): Promise<RestaurantResponse> {
  return fetchRestaurantData()
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchRestaurantData()
  return data.categories
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchRestaurantData()
  return data.products
}

export async function getTables(): Promise<Table[]> {
  const data = await fetchRestaurantData()
  return data.tables
}

export async function getProductsByCategory(
  categoryId: number,
  subCategoryId?: number
): Promise<Product[]> {
  const data = await fetchRestaurantData()

  return data.products.filter((p) => {
    if (subCategoryId !== undefined) {
      return p.category === categoryId && p.subCategory === subCategoryId
    }
    return p.category === categoryId
  })
}
