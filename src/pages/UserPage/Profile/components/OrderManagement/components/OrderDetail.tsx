import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderInformation } from "../../../../../../model/order";
import { orderApi } from "../../../../../../service/api/orderApi";
import { Divider, Skeleton, Tag } from "antd";
import ImageSlide from "../../../../../../components/ImageSlide/ImageSlide";
import { formatDateHour, formatVND } from "../../../../../../utils/format";
import { condition, orderStatus } from "../../../../../../utils/render/statusRender";

const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<OrderInformation>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async (orderID: number) => {
      try {
        setLoading(true);
        const response = await orderApi.orderDetail(orderID);
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
                Điều kiện:{" "}
                {condition[data.product.condition]()}
              </p>
            </div>
          </div>
        </div>
      </Skeleton>
    )
  );
};

export default OrderDetail;
