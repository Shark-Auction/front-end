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
  date_of_birth: string;
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parent: string | any;
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

export interface ProductProfile {
  createdAt: string;
  updatedAt: string;
  id: number;
  seller: User;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  origin: Origin;
  condition: "NOTUSE" | "HIGHNEW" | "AVERAGENEW" | "LOWNEW" | "OLD";
  startingPrice: number;
  status:
    | "PENDING"
    | "CONFIRMING"
    | "SCHEDULING"
    | "AUCTIONING"
    | "AUCTIONSUCCESS"
    | "DELIVERING"
    | "DELIVERED"
    | "AUCTIONFAIL";
  product_images: ProductImage[];
  thumbnail: string;
  buyNow: boolean;
  buyNowPrice: number;
  finalPrice: number;
  desiredPrice: number;
  deliveryMethod: string;
}

export interface MyAuctionProfile {
  id: number;
  product: ProductProfile;
  startTime: string;
  endTime: string;
  step: number | 0;
  totalBids: number | 0;
  currentPrice: number | 0;
  winner: User;
  status: "Waiting" | "InProgress" | "Completed" | "Cancel" | "WaitingPay";
}

export interface UpdateAuctionDateData {
  dateRange: any[];
}

export interface UpdateAuctionDate {
  startTime: string;
  endTime: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
}
