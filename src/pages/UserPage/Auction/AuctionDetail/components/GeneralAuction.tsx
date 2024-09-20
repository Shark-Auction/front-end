import ImageSlide from "./ImageSlide/ImageSlide";
import { ModalBidding } from "./Modal/ModalBidding";
import { ModalHistory } from "./Modal/ModalHistory";
import { useEffect, useState } from "react";
import { Tag } from "antd";
import { formatDateHour, formatVND } from "../../../../../utils/format";
import { Auction, UserAuction } from "../../../../../model/auction";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/store/store";
import { badgeRibbonStatus } from "../../../../../utils/render/statusRender";
import { GiHammerDrop } from "react-icons/gi";
import { FaClock } from "react-icons/fa";

interface GeneralAuctionProps {
  data: Auction;
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

export const GeneralAuction = ({ data }: GeneralAuctionProps) => {
  const [isWinner, setIsWinner] = useState<UserAuction>();
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(data.endTime)
  );
  const userLoginned = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(data.endTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data.endTime]);

  useEffect(() => {
    if (data && userLoginned && data.winner !== null) {
      setIsWinner(data.winner);
    }
  }, [data, userLoginned]);
  return (
    <div className="w-full border shadow-shadowLight flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 h-full">
        <ImageSlide image={data.product.product_images} />
      </div>
      <div className="py-5 md:w-3/4 px-3 flex flex-col gap-5 w-full md:ml-10">
        <p className="text-2xl">
          <strong>{data.product.name}</strong>
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-10 w-fit">
          <p className={`${textCss} text-gray-500`}>Giá trị hiện tại:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(data.currentPrice)}
          </p>
          <p className={`${textCss} text-gray-500`}>Bước nhảy:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(data.step)}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="flex items-center gap-4">
            <GiHammerDrop className="text-3xl" />
            <p className="md:text-xl font-semibold">{data.totalBids}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaClock className="text-3xl" />
            <Tag color="blue" className="text-base">
              {timeRemaining}
            </Tag>
          </div>
          <div className="border bg-gradient-secondary rounded-lg px-5 !w-fit">
            <p className="md:text-lg font-semibold">
              Phiên kết thúc lúc {formatDateHour(data.endTime)}
            </p>
          </div>
        </div>
        <div className="flex w-full mt-5">
          {userLoginned && data.product.seller.id === userLoginned["userId"] ? (
            <div className="bg-gradient-primary text-white !p-2 !w-full text-center rounded-lg">
              <p className="text-2xl font-semibold">
                Bạn là người sở hữu phiên này
              </p>
            </div>
          ) : (
            <ModalBidding
              auctionId={data.id}
              step={data.step}
              currentPrice={data.currentPrice}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-start gap-5">
          {isWinner && (
            <div>
              {userLoginned &&
              isWinner?.user_name === userLoginned["userName"] ? (
                <Tag className="md:!text-lg" color="volcano">
                  <span className="font-black">Bạn </span>
                  đang là người trả giá cao nhất
                </Tag>
              ) : (
                <Tag className="md:!text-lg" color="volcano">
                  <span className="font-black">{data?.winner?.full_name} </span>
                  đang là người trả giá cao nhất
                </Tag>
              )}
            </div>
          )}
          <ModalHistory id={data.id} />
        </div>
      </div>
      {badgeRibbonStatus[data.status]()}
    </div>
  );
};
