export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  CART: {
    GET: "/cart",
    ADD_ITEM: "/cart/items",
    REMOVE_ITEM: (idProduct: string) => `/cart/items/${idProduct}`
  },
  PRODUCTS: {
    GET: "https://dummyjson.com/products"
  }
}