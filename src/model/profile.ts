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
  condition: 'NOTUSE' | 'HIGHNEW' | 'AVERAGENEW' | 'LOWNEW' | 'OLD';
  startingPrice: number;
  status: 'PENDING' | 'CONFIRMING' | 'SCHEDULING' | 'AUCTIONING' | 'AUCTIONSUCCESS' | 'DELIVERING' | 'DELIVERED' | 'AUCTIONFAIL';
  product_images: ProductImage[];
  thumbnail: string;
}

export interface MyAuction {
  id: number;
  product: ProductProfile;
  startTime: string;
  endTime: string;
  step: number;
  totalBids: number;
  currentPrice: number;
  winner: User;
  status: "Waiting" | "InProgress" | "Completed" | "Cancel" | "WaitingPay";
}
