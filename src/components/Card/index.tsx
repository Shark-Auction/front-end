import { Card, Tag } from "antd";
import ButtonPrimary from "../Button";
import { useEffect, useState } from "react";
import ImageComponent from "../Image";
import { formatVND } from "../../utils/format";
import { getImageProduct } from "../../utils/getImage";

interface CardElementProps {
  name: string;
  currentPrice: number;
  remainDay: string;
  status: React.ReactElement;
  id: number;
  image: string;
  onClick?: any;
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

  return (
    <Card
      onClick={onClick}
      hoverable={true}
      key={id}
      cover={<ImageComponent width={'100%'} height={'100%'} preview={false} src={getImageProduct(image)} />}
      actions={[
        <ButtonPrimary className="!text-base !font-normal">
          Đấu giá
        </ButtonPrimary>,
      ]}
      className="shadow-shadowHeavy max-w-full md:max-w-sm lg:max-w-xs !overflow-hidden"
    >
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden">
          <p className="text-base text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </p>
        </div>
        <p className="text-orange-500 text-base">{formatVND(currentPrice)}</p>
        <div className="flex justify-between flex-col sm:flex-col md:flex-col lg:flex-col gap-3">
          <Tag color="blue" className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-fit">
            {timeRemaining}
          </Tag>
          <div>{status}</div>
        </div>
      </div>
    </Card>
  );
};

export default CardElement;
