import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderInformation } from "../../../../../../model/order";
import { orderApi } from "../../../../../../service/api/orderApi";
import { Divider, Skeleton, Steps, Tag } from "antd";
import ImageSlide from "../../../../../../components/ImageSlide/ImageSlide";
import { formatDateHour, formatVND } from "../../../../../../utils/format";
import {
  condition,
  orderStatus,
} from "../../../../../../utils/render/statusRender";
import { Delivery } from "../../../../../../model/delivery";
import { deliveryApi } from "../../../../../../service/api/deliveryApi";
import {
  FaBox,
  FaDropbox,
  FaShippingFast,
  FaTruckLoading,
} from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

type DeliveryStatus = "processing" | "shipping" | "delivered" | "received";

const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<OrderInformation>();
  const [dataDelivery, setDataDelivery] = useState<Delivery>();
  const [loading, setLoading] = useState<boolean>(false);

  const items = [
    {
      title: "Đang xử lý",
      icon: <FaTruckLoading />,
    },
    {
      title: "Đang giao hàng",
      icon: <FaShippingFast />,
    },
    {
      title: "Đã giao hàng",
      icon: <FaBox />,
    },
    {
      title: "Đã nhận",
      icon: <IoCheckmarkDoneCircle />,
    },
  ];
  const itemsDeliveringGHN = [
    {
      title: "Đang xử lý",
      icon: <FaTruckLoading />,
      status: dataDelivery?.status === "CANCEL" && "error",
    },
    {
      title: "Đang nhập kho",
      icon: <FaDropbox />,
    },
    {
      title: "Đang giao hàng",
      icon: <FaShippingFast />,
    },
    {
      title: "Đã giao hàng",
      icon: <FaBox />,
      status: dataDelivery?.status === "DELIVERY_FAIL" && "error",
    },
  ];
  const handleStatusDelivery: Record<DeliveryStatus, number> = {
    processing: 0,
    shipping: 1,
    delivered: 2,
    received: 3,
  };

  const handleStatusDeliveryGHN: Record<
    "PICKING" | "STORING" | "DELIVERING" | "DELIVERED",
    number
  > = {
    PICKING: 0,
    STORING: 1,
    DELIVERING: 2,
    DELIVERED: 3,
  };

  useEffect(() => {
    const fetchData = async (orderID: number) => {
      try {
        setLoading(true);
        const response = await orderApi.orderDetail(orderID);
        const responseDeli = await deliveryApi.getDeliveryByOrder(orderID);
        setDataDelivery(responseDeli.data[0]);
        setData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData(Number(id));
    }
  }, [id]);

  return (
    data && (
      <Skeleton loading={loading}>
        <div className="flex flex-col">
          <div className="flex md:flex-row flex-col gap-10">
            <div className="w-full lg:w-2/5 h-full">
              <ImageSlide image={data?.product.product_images} />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Mã đơn hàng: {data.id}</p>
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
                Trạng thái giao hàng:{" "}
                {data.status && orderStatus[data?.status]()}
              </p>
              <p className="text-lg">
                Ngày gửi:{" "}
                <Tag className="!text-base font-normal" color="pink">
                  {data.sendDate ? data.sendDate : "Sản phẩm chưa được gửi"}
                </Tag>
              </p>
              <p className="text-lg">
                Ngày nhận:{" "}
                <Tag className="!text-base font-normal" color="purple">
                  {data.receivedDate
                    ? data.receivedDate
                    : "Ngày nhận chưa xác định"}
                </Tag>
              </p>
              <Divider className="!my-2" />
              <p className="text-lg">
                Danh mục:{" "}
                <Tag className="!text-base ">{data.product.category.name}</Tag>
                {data.product.category.parent && (
                  <span>
                    <Tag className="!text-base ">
                      {data.product.category.parent.name}
                    </Tag>
                  </span>
                )}
              </p>
              <p className="text-lg">
                Hãng:{" "}
                <Tag className="!text-base">{data.product.brand.name}</Tag>
              </p>
              <p className="text-lg">
                Xuất xứ:{" "}
                <Tag className="!text-base">{data.product.origin.name}</Tag>
              </p>
              <p className="text-lg">
                Điều kiện: {condition[data.product.condition]()}
              </p>
            </div>
          </div>
          <Divider className="!text-2xl !mt-5 ">
            <span
              className="bg-clip-text font-extrabold shadow-shadowHeavy px-4 py-1 rounded-xl
        text-transparent bg-gradient-to-r from-orange-900 via-orange-700 to-orange-900"
            >
              Thông tin giao hàng
            </span>
          </Divider>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-lg">
                  Họ tên người nhận:{" "}
                  <strong>
                    {" "}
                    {data.product.deliveryMethod !== "self_shipping"
                      ? dataDelivery?.toName
                        ? dataDelivery?.toName
                        : "Người mua chưa nhập tên"
                      : data.buyer.full_name}
                  </strong>
                </p>
                <p className="text-lg">
                  Số điện thoại:{" "}
                  <strong>
                    {data.product.deliveryMethod !== "self_shipping"
                      ? dataDelivery?.toPhone
                        ? dataDelivery?.toPhone
                        : "Người mua chưa nhập số điện thoại"
                      : data.buyer.phone_number}
                  </strong>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg">
                  Họ tên người gửi:{" "}
                  <strong>
                    {" "}
                    {data.product.deliveryMethod !== "self_shipping"
                      ? dataDelivery?.fromName
                        ? dataDelivery?.fromName
                        : "Người bán chưa nhập tên"
                      : data.product.seller.full_name}
                  </strong>
                </p>
                <p className="text-lg">
                  Số điện thoại:{" "}
                  <strong>
                    {data.product.deliveryMethod !== "self_shipping"
                      ? dataDelivery?.fromPhone
                        ? dataDelivery?.fromPhone
                        : "Người bán chưa nhập số điện thoại"
                      : data.product.seller.phone_number}
                  </strong>
                </p>
              </div>
            </div>
            <Steps
              current={
                data.product.deliveryMethod === "self_shipping"
                  ? handleStatusDelivery[data.status as DeliveryStatus]
                  : handleStatusDeliveryGHN[
                      dataDelivery?.status as
                        | "PICKING"
                        | "STORING"
                        | "DELIVERING"
                        | "DELIVERED"
                    ]
              }
              items={
                data.product.deliveryMethod === "self_shipping"
                  ? items
                  : itemsDeliveringGHN
              }
            />
          </div>
        </div>
      </Skeleton>
    )
  );
};

export default OrderDetail;
