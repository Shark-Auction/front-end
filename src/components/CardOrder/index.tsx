import { Button, Card, Tag } from "antd";
import ImageComponent from "../Image";
import { formatDateHour, formatVND } from "../../utils/format";
import ButtonPrimary from "../Button";
import { OrderInformation } from "../../model/order";
import { getImageProduct } from "../../utils/getImage";
import { orderStatus } from "../../utils/render/statusRender";
import { Link } from "react-router-dom";
import { RootState } from "../../core/store/store";
import { useSelector } from "react-redux";

interface CardOrderProps {
  data: OrderInformation;
  loadingAction?: boolean;
  onClickDetail?: () => void;
  onClickRating?: () => void;
  onClickPayment?: () => void;
  onClickConfirmed?: () => void;
  onClickDelivered?: () => void;
  onClickSent?: () => void;
  onClickDeliveredInformation?: () => void;
}

const CardOrder = ({
  data,
  onClickDetail,
  onClickRating,
  onClickPayment,
  onClickConfirmed,
  onClickDelivered,
  onClickSent,
  onClickDeliveredInformation,
  loadingAction,
}: CardOrderProps) => {
  const userLoginned = useSelector((state: RootState) => state.user);  
  return (
    <Card
      loading={loadingAction}
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
          <p className="text-base">Mã đơn hàng: {data.id}</p>
          <p className="text-2xl font-bold">{data.product.name}</p>
          <p className="text-lg">
            Giá chốt:{" "}
            <strong className="text-orange-600 text-xl">
              {data.product.buyNow === true
                ? formatVND(data.product.buyNowPrice)
                : formatVND(data.product.finalPrice)}
            </strong>
          </p>
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-lg">
              Thời gian thanh toán:{" "}
              <Tag className="!text-base" color="blue">
                {formatDateHour(data.orderDate)}
              </Tag>
            </p>
            <p className="text-lg">
              Trạng thái giao hàng: {data.status && orderStatus[data?.status]()}
            </p>
          </div>
          {data.buyer.user_name ===
          (userLoginned && userLoginned["userName"]) ? (
            <p className="text-lg">
              Người bán:{" "}
              <Link
                className="underline underline-offset-2 text-blue-600 hover:underline hover:!text-blue-600"
                to={`/u/seller/${data.product.seller.id}`}
              >
                {data.product.seller.full_name}
              </Link>
            </p>
          ) : (
            <p className="text-lg">
              Người mua:{" "}
              <Link
                className="underline underline-offset-2 text-blue-600 hover:underline hover:!text-blue-600"
                to={`/u/seller/${data.buyer.id}`}
              >
                {data.buyer.full_name}
              </Link>
            </p>
          )}
        </div>
        <div className="w-full flex justify-end gap-5">
          <ButtonPrimary onClick={onClickDetail} className="!text-base">
            Xem chi tiết
          </ButtonPrimary>
          {data.status === "shipping" &&
            userLoginned &&
            userLoginned["userName"] === data.product.seller.user_name &&
            data.product.deliveryMethod === "self_shipping" && (
              <Button
                onClick={onClickDelivered}
                className="!text-base !text-white !bg-amber-600 hover:!bg-amber-600 !shadow-shadowLight"
              >
                Giao hàng
              </Button>
            )}
          {data.status === "processing" &&
            userLoginned &&
            userLoginned["userName"] === data.product.seller.user_name && (
              <>
                {data.product.deliveryMethod === "self_shipping" ? (
                  <Button
                    onClick={onClickSent}
                    className="!text-base !text-black !bg-lime-200 hover:!bg-lime-200 !shadow-shadowLight"
                  >
                    Gửi hàng
                  </Button>
                ) : (
                  <Button
                    onClick={onClickDeliveredInformation}
                    className="!text-base !text-black !bg-green-200 hover:!bg-green -200 !shadow-shadowLight"
                  >
                    Nhập thông tin cho GHN
                  </Button>
                )}
              </>
            )}
          {data.status === "paid" && (
            <ButtonPrimary
              onClick={onClickPayment}
              hover="!bg-gradient-orange"
              className="!text-base !bg-gradient-orange"
            >
              Nhập thông tin giao hàng
            </ButtonPrimary>
          )}
          {data.status === "processing" &&
            userLoginned &&
            userLoginned["userName"] !== data.product.seller.user_name && (
              <Button
                onClick={onClickDeliveredInformation}
                className="!text-base !text-white !bg-green-600 hover:!bg-green-600 !shadow-shadowLight"
              >
                Nhập thông tin cho GHN
              </Button>
            )}
          {data.status === "delivered" &&
            userLoginned &&
            userLoginned["userName"] !== data.product.seller.user_name && (
              <Button
                onClick={onClickConfirmed}
                className="!text-base !text-white !bg-cyan-600 hover:!bg-cyan-600 !shadow-shadowLight"
              >
                Xác nhận
              </Button>
            )}
          {data.status === "received" && (
            <ButtonPrimary
              onClick={onClickRating}
              hover="!bg-gradient-orange"
              className="!text-base !bg-gradient-orange"
            >
              Đánh giá
            </ButtonPrimary>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardOrder;
