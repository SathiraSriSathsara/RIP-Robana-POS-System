export type Restaurant = {
  name: string
  currency: string
  serviceCharge: number
}

export type SubCategory = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
  icon: string
  subCategories: SubCategory[]
}

export type Product = {
  id: number
  name: string
  price: number
  category: number
  subCategory: number | null
  image: string
}

export type Table = {
  id: number
  number: number
  capacity: number
  x: number
  y: number
  status: string
}

export type RestaurantResponse = {
  restaurant: Restaurant
  categories: Category[]
  products: Product[]
  tables: Table[]
}
