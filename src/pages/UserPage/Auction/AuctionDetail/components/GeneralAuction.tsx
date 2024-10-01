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
    <div className="w-full border rounded-lg shadow-shadowLight flex flex-col md:flex-row bg-white">
      <div className="py-5 flex flex-col gap-5 w-full md:ml-5">
        {data && badgeRibbonStatus[data.status]()}
        <p className="text-2xl">
          <strong>{data.product.name}</strong>
        </p>
        <div className="grid grid-cols-2 gap-y-4 gap-x-5 w-fit">
          <p className={`${textCss} text-gray-500`}>Giá trị hiện tại:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(data.currentPrice)}
          </p>
          <p className={`${textCss} text-gray-500`}>Bước nhảy:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {formatVND(data.step)}
          </p>
          <p className={`${textCss} text-gray-500`}>Thời gian bắt đầu:</p>
          <Tag color="geekblue" className="md:text-base">
            {formatDateHour(data.startTime)}
          </Tag>
          <div className="border bg-gradient-secondary rounded-lg px-5 !w-fit col-span-2">
            <p className="md:text-lg font-semibold">
              Phiên kết thúc lúc {formatDateHour(data.endTime)}
            </p>
          </div>
        </div>
        <div className="flex md:flex-row gap-5 md:gap-10">
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
        </div>
        <div className="flex flex-col items-start md:justify-start gap-5">
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
    </div>
  );
};
