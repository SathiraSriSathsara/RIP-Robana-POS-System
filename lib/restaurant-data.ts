import restaurantData from "./restaurant-data.json"

export type Category = (typeof restaurantData.categories)[0]
export type SubCategory = Category["subCategories"][0]
export type Product = (typeof restaurantData.products)[0]
export type Table = (typeof restaurantData.tables)[0]

export const getRestaurantData = () => restaurantData
export const getCategories = () => restaurantData.categories
export const getProducts = () => restaurantData.products
export const getTables = () => restaurantData.tables
export const getProductsByCategory = (categoryId: number, subCategoryId?: number) => {
  return restaurantData.products.filter((p) => {
    if (subCategoryId !== undefined) {
      return p.category === categoryId && p.subCategory === subCategoryId
    }
    return p.category === categoryId
  })
}
