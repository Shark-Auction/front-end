export interface PaymentRequest {
  userId: number;
  orderId: number;
  senderTransaction: boolean;
}

export interface PaymentResponse {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: string;
  checkoutUrl: string;
  qrCode: string;
}

// Define interfaces for nested structures

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string;
  date_of_birth: string; // You may use Date type if you want: Date
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parent: string;
}

interface Brand {
  createdAt: string; // You may use Date type if needed
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

interface Product {
  createdAt: string;
  updatedAt: string;
  id: number;
  seller: User;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  origin: Origin;
  condition: string; // e.g., "NOTUSE"
  startingPrice: number;
  buyNowPrice: number;
  finalPrice: number;
  desiredPrice: number;
  status: string; // e.g., "PENDING"
  product_images: ProductImage[];
  thumbnail: string;
  deliveryMethod: string; // e.g., "self_shipping"
  buyNow: boolean;
}

interface OrderEntity {
  createdAt: string;
  updatedAt: string;
  id: number;
  buyer: User;
  fullName: string;
  phoneNumber: string;
  note: string;
  orderDate: string;
  status: string; // e.g., "pending"
  type: string; // e.g., "BuyNow"
  price: number;
  product: Product;
  toAddress: string;
  sendDate: string;
  receivedDate: string;
}

// Main Payment interface
export interface Payment {
  id: number;
  orderCode: number;
  paymentID: string;
  amount: number;
  description: string;
  paymentUser: User;
  orderEntity: OrderEntity;
  status: string; // e.g., "PAID"
  checkoutUrl: string;
  senderTransaction: boolean;
}
