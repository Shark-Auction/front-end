import { Card, Popover, Tag } from "antd";
import { useEffect, useState } from "react";
import { GiHammerDrop } from "react-icons/gi";
import { VscDebugStepOver } from "react-icons/vsc";
import { Auction } from "../../model/auction";
import { formatVND } from "../../utils/format";
import { getImageProduct } from "../../utils/getImage";
import ImageComponent from "../Image";

interface CardElementProps {
  name: string;
  currentPrice: number;
  remainDay: string;
  status: React.ReactElement;
  id: number;
  image: string;
  onClick?: any;
  data?: Auction;
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

const CardElement = ({
  name,
  currentPrice,
  remainDay,
  status,
  id,
  image,
  onClick,
  data,
}: CardElementProps) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(remainDay)
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(remainDay));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainDay]);

  const content = (
    <div className="flex md:flex-row gap-5 md:gap-10">
      <div className="flex items-center gap-4">
        <GiHammerDrop className="text-3xl" />
        <p className="md:text-base font-semibold">{data?.totalBids}</p>
      </div>
      <div className="flex items-center gap-4">
        <VscDebugStepOver className="text-3xl" />
        <p className="md:text-base font-semibold text-orange-600">
          {formatVND(data?.step ? data.step : 0)}
        </p>
      </div>
    </div>
  );

  return (
    <Popover content={content} color="#7DF9FF" arrow={true} placement="right" title={<p className="text-lg">Tóm tắt phiên</p>}>
      <Card
        onClick={onClick}
        hoverable={true}
        key={id}
        cover={
          <ImageComponent
            width={"100%"}
            height={"100%"}
            preview={false}
            src={getImageProduct(image)}
          />
        }
        className="shadow-shadowHeavy max-w-full md:max-w-sm lg:max-w-xs !overflow-hidden"
      >
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap font-bold">
              {name}
            </p>
          </div>
          <p className="text-orange-500 text-base">{formatVND(currentPrice)}</p>
          <div className="flex justify-between flex-col sm:flex-col md:flex-col lg:flex-col gap-3">
            <Tag
              color="blue"
              className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-fit"
            >
              {timeRemaining}
            </Tag>
            <div>{status}</div>
          </div>
        </div>
      </Card>
    </Popover>
  );
};

export default CardElement;
