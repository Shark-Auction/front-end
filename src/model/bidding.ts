export interface BiddingData {
  auctionId: number;
  bidAmount: number
}

export interface AuctionBiddingDetail {
  id: number;
  auction: {
    id: number;
    product: {
      createdAt: string;
      updatedAt: string;
      id: number;
      seller: User;
      name: string;
      description: string;
      category: {
        id: number;
        name: string;
        imageUrl: string;
        parent: {
          id: number;
          name: string;
          imageUrl: string;
          parent: null | CategoryParent;
        } | null;
      };
      brand: {
        createdAt: string;
        updatedAt: string;
        id: number;
        name: string;
      };
      origin: {
        createdAt: string;
        updatedAt: string;
        id: number;
        name: string;
      };
      condition: string;
      startingPrice: number;
      status: string;
      product_images: ProductImage[];
      thumbnail: string;
    };
    startTime: string;
    endTime: string;
    step: number;
    totalBids: number;
    currentPrice: number;
    winner: User;
    status: string;
  };
  customer: User;
  bidAmount: number;
  bidTime: string;
  autoBid: boolean;
}

interface User {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string | null;
  date_of_birth: string;
  role_id: {
    id: number;
    name: string;
  };
  email_verified: boolean;
  is_active: boolean;
}

interface ProductImage {
  id: number;
  url: string;
}

interface CategoryParent {
  id: number;
  name: string;
  imageUrl: string;
  parent: any;
}
