import { useState } from "react";
import { Auction } from "../../../../../model/auction";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/store/store";
import { ModalBidding } from "./Modal/ModalBidding";
import { SellerAuction } from "./SellerAuction";
import ButtonPrimary from "../../../../../components/Button";
import { formatVND } from "../../../../../utils/format";
import ModalBuyNow from "./Modal/ModalBuyNow";
import { Divider } from "antd";

interface ActionAuctionProps {
  data: Auction;
}

const ActionAuction = ({ data }: ActionAuctionProps) => {
  const [openBuyNow, setOpenBuyNow] = useState<boolean>(false);
  const userLoginned = useSelector((state: RootState) => state.user);
  return (
    <div className="flex flex-col gap-5 bg-white p-5 shadow-shadowHeavy rounded-lg lg:sticky lg:top-[100px]">
      <SellerAuction seller={data.product.seller} />
      {userLoginned && data.product.seller.id !== userLoginned["userId"] ? (
        data.status === "InProgress" && (
          <div>
            <div className="flex w-full">
              <ModalBidding
                auctionId={data.id}
                step={data.step}
                currentPrice={data.currentPrice}
              />
            </div>
            {data.product.buyNow === true && (
            <>
              <Divider className="!my-2">Hoặc</Divider>
  
                <div className="flex lg:flex-col items-start gap-3">
                  <ButtonPrimary
                    onClick={() => setOpenBuyNow(true)}
                    className="!bg-gradient-orange lg:!w-full"
                  >
                    Mua ngay
                  </ButtonPrimary>
                  <p className="text-lg">
                    Với mức giá{" "}
                    <strong className="text-orange-600">
                      {formatVND(data.product.buyNowPrice)}
                    </strong>
                  </p>
                </div>
            </>
            )}
          </div>
        )
      ) : (
        <div className="bg-gradient-orange text-white !px-4 !w-full text-center rounded-md">
          <p className="text-lg">Bạn đăng phiên này</p>
        </div>
      )}
      <ModalBuyNow data={data} open={openBuyNow} setOpen={setOpenBuyNow} />
    </div>
  );
};

export default ActionAuction;
