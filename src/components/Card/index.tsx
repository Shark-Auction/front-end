import { Card } from "antd";
import ButtonPrimary from "../Button";

interface CardElementProps {
  name: string;
  currentPrice: string;
  remainDay: string;
  status: string;
  id: string;
  image: string;
}

const CardElement = ({
  name,
  currentPrice,
  remainDay,
  status,
  id,
  image,
}: CardElementProps) => (
  <Card
    key={id}
    cover={<img alt={name} src={image} />}
    actions={[
      <ButtonPrimary className="!text-lg !font-normal !w-3/4">
        Bidding
      </ButtonPrimary>,
    ]}
    className="shadow-shadowHeavy"
  >
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden">
        <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </p>
      </div>
      <p className="text-orange-500">{currentPrice}</p>
      <div className="flex justify-between">
        <p>{remainDay}</p>
        <p>{status}</p>
      </div>
    </div>
  </Card>
);

export default CardElement;
