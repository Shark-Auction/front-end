import { Avatar, Button } from "antd";
import ButtonPrimary from "../../../../../components/Button";
import { AuctionSellerModel, SellerInfor } from "../../../../../model/seller";

interface SellerInformationProps {
  data?: SellerInfor;
  auction?: AuctionSellerModel[];
}

export const SellerInformation = ({
  data,
  auction,
}: SellerInformationProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-16 border rounded-md shadow-shadowLight py-10">
      {data && auction && (
        <>
          <div>
            <Avatar className="w-24 h-24" />
          </div>
          <div className="flex flex-col justify-between gap-5">
            <p className="text-lg">
              <strong>{data.full_name}</strong>
            </p>
            <p className="text-lg text-gray-500">
              <span>Số sản phẩm:</span>{" "}
              <strong className="text-black">{auction.length}</strong> sản phẩm
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <ButtonPrimary className="text-lg !px-10">Follow</ButtonPrimary>
            <Button className="text-lg !px-10">Chat</Button>
          </div>
        </>
      )}
    </div>
  );
};
