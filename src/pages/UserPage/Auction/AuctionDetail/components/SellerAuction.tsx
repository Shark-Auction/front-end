import { Avatar } from "antd";
import ButtonPrimary from "../../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { UserAuction } from "../../../../../model/auction";

interface SellerAuctionProps {
  seller: UserAuction;
}

export const SellerAuction = ({ seller }: SellerAuctionProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex gap-5 items-center">
        <Avatar className="w-16 h-16" />
        <div className="flex flex-col gap-2">
          <p className="text-xl">
            <strong>{seller.full_name}</strong>
          </p>
          <ButtonPrimary
            onClick={() => navigate(`/u/seller/${seller.id}`)}
            className="!border-2"
          >
            Xem người bán
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
