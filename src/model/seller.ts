export interface SellerInfor {
  id: number;
  full_name: string;
  user_name: string;
  email: string;
  address: string;
  imageUrl: string;
  date_of_birth: string;
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

interface Role {
  id: number;
  name: string;
}

interface Product {
  createdAt: string;
  updatedAt: string;
  id: number;
  seller: Seller;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  origin: Origin;
  condition: string;
  startingPrice: number;
  buyNowPrice: number;
  finalPrice: number;
  desiredPrice: number;
  status: string;
  product_images: ProductImage[];
  thumbnail: string;
  deliveryMethod: string;
  buyNow: boolean;
}

interface Seller {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string;
  date_of_birth: string;
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

interface Role {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parent: string;
}

interface Brand {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}

interface Origin {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  url: string;
}

interface Winner {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string;
  date_of_birth: string;
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

export interface AuctionSellerModel {
  id: number;
  product: Product;
  startTime: string;
  endTime: string;
  step: number;
  totalBids: number;
  currentPrice: number;
  winner: Winner;
  status: 'Waiting' | 'InProgress' | 'Completed' | 'Cancel' | 'WaitingPay' | 'Fail';
}