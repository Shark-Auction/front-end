export interface ProductRequest {
  name: string;
  description: string;
  categoryId: number;
  brandName: string;
  originName: string;
  startingPrice: number;
  buyNowPrice: number;
  desiredPrice: number; 
  condition: string;
  image: any[];
  buyNow: boolean;
  deliveryMethod: string;
}

export interface ProductDetailRequest {
  name: string;
  description: string;
  categoryId: number;
  brandName: string;
  originName: string;
  startingPrice: number;
  condition: string;
}

