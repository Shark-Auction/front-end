import { TbHammer } from "react-icons/tb";
import ImageSlide from "./ImageSlide/ImageSlide";
import { LuClock3 } from "react-icons/lu";
import { ModalBidding } from "./Modal/ModalBidding";
import { ModalHistory } from "./Modal/ModalHistory";
import { useEffect, useState } from "react";
import { Tag } from "antd";
import { formatDateHour, formatVND } from "../../../../../utils/format";
import { ProductImage, UserAuction } from "../../../../../model/auction";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/store/store";
import { AuctionBiddingDetail } from "../../../../../model/bidding";

interface GeneralAuctionProps {
  name: string;
  currentPrice: number;
  step: number;
  numberOfBidding: number;
  remainDay: string;
  dateEnd: string;
  auctionId: number;
  user: UserAuction;
  biddingList: AuctionBiddingDetail[];
  image: ProductImage[];
}

const calculateTimeRemaining = (remainDay: string) => {
  const now = new Date();
  const difference = new Date(remainDay).getTime() - now.getTime();
  if (difference <= 0) return "0d 0h 0m 0s";

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const hours = Math.floor((difference / 1000 / 60 / 60) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const textCss = "md:text-xl";

export const GeneralAuction = ({
  user,
  auctionId,
  name,
  currentPrice,
  step,
  numberOfBidding,
  remainDay,
  dateEnd,
  image,
  biddingList,
}: GeneralAuctionProps) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(remainDay)
  );
  const userLoginned = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(remainDay));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainDay]);
  return (
    <div className="w-full border shadow-shadowLight flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-2/4 h-[600px]">
        <ImageSlide image={image} />
      </div>
      <div className="py-5 px-3 flex flex-col gap-5 w-full">
        <p className="text-2xl">
          <strong>{name}</strong>
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-10 w-fit">
          <p className={`${textCss} text-gray-500`}>Giá trị hiện tại:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(currentPrice)}
          </p>
          <p className={`${textCss} text-gray-500`}>Bước nhảy:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(step)}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="flex items-center gap-4">
            <TbHammer className="text-3xl" />
            <p className="md:text-xl font-semibold">{numberOfBidding}</p>
          </div>
          <div className="flex items-center gap-4">
            <LuClock3 className="text-3xl" />
            <Tag color="blue" className="text-base">
              {timeRemaining}
            </Tag>
          </div>
          <div className="border bg-gray-300 rounded-lg px-5">
            <p className="md:text-lg font-semibold">
              Phiên kết thúc lúc {formatDateHour(dateEnd)}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center mt-5">
          {userLoginned && user.id === userLoginned["userId"] ? (
            <p className="text-xl font-semibold">
              Bạn là người sở hữu phiên này
            </p>
          ) : (
            <ModalBidding
              auctionId={auctionId}
              step={step}
              currentPrice={currentPrice}
            />
          )}
        </div>
        <ModalHistory data={biddingList} />
      </div>
    </div>
  );
};
