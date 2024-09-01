import { Avatar, Button, Rate } from "antd";
import ButtonPrimary from "../../../../../components/Button";

interface SellerInformationProps {
  sellerName: string;
  follower: number;
  reputation: number;
  product: number;
  participateIn: string;
  rating: number;
}

export const SellerInformation = ({
  sellerName,
  follower,
  reputation,
  product,
  participateIn,
  rating,
}: SellerInformationProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-16 border rounded-md shadow-shadowLight py-10">
      <div>
        <Avatar className="w-24 h-24" />
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-lg">
          <strong>{sellerName}</strong>
        </p>
        <p className="text-lg">{follower} Follower</p>
        <p className="text-lg">
          <strong>Reputation:</strong> {reputation}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-lg text-gray-500">
          <span>Product:</span> {product}
        </p>
        <p className="text-lg text-gray-500">
          <span>Participate in:</span> {participateIn}
        </p>
        <p className="text-lg">
          <strong>Rating:</strong> <Rate disabled value={rating} />
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <ButtonPrimary className="text-lg !px-10">Follow</ButtonPrimary>
        <Button className="text-lg !px-10">Chat</Button>
      </div>
    </div>
  );
};
