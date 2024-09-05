import { Card } from "antd";
import ButtonPrimary from "../Button";

interface CardElementProps {
  name: string;
  currentPrice: string;
  remainDay: string;
  status: string;
  id: string;
  image: string;
  onClick?: any;
}

const CardElement = ({
  name,
  currentPrice,
  remainDay,
  status,
  id,
  image,
  onClick,
}: CardElementProps) => (
  <Card
    onClick={onClick}
    hoverable={true}
    key={id}
    cover={<img alt={name} src={image} />}
    actions={[
      <ButtonPrimary className="!text-base !font-normal">
        Bidding
      </ButtonPrimary>,
    ]}
    className="shadow-shadowHeavy max-w-full md:max-w-sm lg:max-w-xs"
  >
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden">
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </p>
      </div>
      <p className="text-orange-500">{currentPrice}</p>
      <div className="flex justify-between flex-col sm:flex-col md:flex-col lg:flex-row">
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {remainDay}
        </p>
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {status}
        </p>
      </div>
    </div>
  </Card>
);

export default CardElement;
