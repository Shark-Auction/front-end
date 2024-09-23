export interface Order {
  fullName: string;
  phoneNumber: string;
  note: string;
  product_id: number;
  toAddress: string;
  type: string
}

// Role interface for both Buyer and Seller
interface Role {
  id: number;
  name: string;
}

// User information for Buyer and Seller
interface User {
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

// Category information of the product
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parent: string;
}

// Brand information of the product
interface Brand {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Origin information of the product
interface Origin {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Product images
interface ProductImage {
  id: number;
  url: string;
}

// Product information
interface Product {
  id: number;
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
  createdAt: string;
  updatedAt: string;
  seller: User;
}

// Order information
export interface OrderInformation {
  id: number;
  buyer: User;
  fullName: string;
  phoneNumber: string;
  note: string;
  orderDate: string;
  status: string;
  type: 'BuyNow' | 'Auction';
  price: number;
  product: Product;
  toAddress: string;
  sendDate: string;
  receivedDate: string;
  createdAt: string;
  updatedAt: string;
}
