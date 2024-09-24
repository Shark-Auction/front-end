import { Card, Divider, Tag } from "antd";
import ImageComponent from "../Image";
import { formatDateHour, formatVND } from "../../utils/format";
import ButtonPrimary from "../Button";
import { OrderInformation } from "../../model/order";
import { getImageProduct } from "../../utils/getImage";
import { orderStatus } from "../../utils/render/statusRender";
import { Link } from "react-router-dom";

interface CardOrderProps {
  data: OrderInformation;
  onClickDetail?: () => void;
  onClickRating?: () => void;
}

const CardOrder = ({ data, onClickDetail, onClickRating }: CardOrderProps) => {
  return (
    <Card
      className="w-full flex overflow-hidden shadow-shadowLight"
      cover={
        <ImageComponent
          width={"100%"}
          height={300}
          src={getImageProduct(data?.product.thumbnail)}
        />
      }
      bodyStyle={{ width: "80%", display: "flex", justifyContent: "flex-end" }}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{data.product.name}</p>
          <p className="text-lg">
            Giá chốt:{" "}
            <strong className="text-orange-600 text-xl">
              {data.product.buyNow === true
                ? formatVND(data.product.buyNowPrice)
                : formatVND(data.product.finalPrice)}
            </strong>
          </p>
          <p className="text-lg">
            Thời gian thanh toán:{" "}
            <Tag className="!text-base" color="blue">
              {formatDateHour(data.orderDate)}
            </Tag>
          </p>
          <p className="text-lg">
            Trạng thái giao hàng: {data.status && orderStatus[data?.status]()}
          </p>
          <p className="text-lg">
            Người bán:{" "}
            <Link
              className="underline underline-offset-2 text-blue-600 hover:underline hover:!text-blue-600"
              to={`/u/seller/${data.product.seller.id}`}
            >
              {data.product.seller.full_name}
            </Link>
          </p>
        </div>
        <div className="w-full flex justify-end gap-5">
          <ButtonPrimary onClick={onClickDetail} className="!text-base">
            Xem chi tiết
          </ButtonPrimary>
          <ButtonPrimary
            onClick={onClickRating}
            hover="!bg-gradient-orange"
            className="!text-base !bg-gradient-orange"
          >
            Đánh giá
          </ButtonPrimary>
        </div>
      </div>
    </Card>
  );
};

export default CardOrder;
