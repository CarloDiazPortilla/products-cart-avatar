export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  originalPrice: number;
  thumbnail: string;
  sku: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  sku: string;
}

export interface ApiProductResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}