export interface RatingRequest {
  customerId: number;
  productId: number;
  ratingValue: number;
  review: string;
  imagesFile: string[];
}
