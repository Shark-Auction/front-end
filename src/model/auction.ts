export interface UserAuction {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string;
  date_of_birth: string;
  role_id: {
    id: number;
    name: string;
  };
  email_verified: boolean;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parent: any;
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

export interface ProductImage {
  id: number;
  url: string;
}

interface Product {
  createdAt: string;
  updatedAt: string;
  id: number;
  seller: UserAuction;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  origin: Origin;
  condition: string;
  startingPrice: number;
  status: string;
  product_images: ProductImage[];
  thumbnail: string;
}

export interface Auction {
  id: number;
  product: Product;
  startTime: string;
  endTime: string;
  step: number;
  totalBids: number;
  currentPrice: number;
  winner: UserAuction;
  status: string;
}
