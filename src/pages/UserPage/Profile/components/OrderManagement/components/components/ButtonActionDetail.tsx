import { Button } from "antd";
import ButtonPrimary from "../../../../../../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/store/store";
import { OrderInformation } from "../../../../../../../model/order";
import { useState } from "react";
import { toast } from "react-toastify";
import { orderApi } from "../../../../../../../service/api/orderApi";
import ModalDeliveryInformation from "./ModalDeliveryInformation";
import ModalRating from "./ModalRating";

interface ButtonActionDetailProps {
  data: OrderInformation;
}

const ButtonActionDetail = ({ data }: ButtonActionDetailProps) => {
  const userLoginned = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [openDelivery, setOpenDelivery] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderInformation>();
  const [type, setType] = useState<string>('')

  const handleOpenModalRating = (record: OrderInformation) => {
    setOpen(true);
    setOrder(record);
  };
  const handleOpenDeliveryInformation = (record: OrderInformation) => {
    setType('buyer')
    setOpenDelivery(true);
    setOrder(record);
  };
  const handleOpenDeliveryInformationSeller = (record: OrderInformation) => {
    setType('seller')
    setOpenDelivery(true);
    setOrder(record);
  };

  const handleReceived = async (id: number) => {
    try {
      await orderApi.receivedOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelivered = async (id: number) => {
    try {
      await orderApi.deliveredOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleSend = async (id: number) => {
    try {
      await orderApi.sendOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-end gap-5 mt-10">
      {data.status === "shipping" &&
        userLoginned &&
        userLoginned["userName"] === data.product.seller.user_name &&
        data.product.deliveryMethod === "self_shipping" && (
          <Button
            onClick={() => handleDelivered(data.id)}
            className="!text-base !text-white !bg-amber-600 hover:!bg-amber-600 !shadow-shadowLight"
          >
            Giao hàng
          </Button>
        )}
      {data.status === "paid" &&
        userLoginned &&
        userLoginned["userName"] === data.product.seller.user_name && (
          <>
            {data.product.deliveryMethod === "self_shipping" ? (
              <Button
                onClick={() => handleSend(data.id)}
                className="!text-base !text-black !bg-lime-200 hover:!bg-lime-200 !shadow-shadowLight"
              >
                Gửi hàng
              </Button>
            ) : (
              <Button
                onClick={() => handleOpenDeliveryInformationSeller(data)}
                className="!text-base !text-white !bg-green-600 hover:!bg-green-600 !shadow-shadowLight"
              >
                Nhập địa chỉ gửi
              </Button>
            )}
          </>
        )}
      {data.buyer &&
        data.buyer?.full_name === (userLoginned && userLoginned["userName"]) &&
        data.status === "paid" && (
          <ButtonPrimary
            // onClick={onClickPayment}
            hover="!bg-gradient-orange"
            className="!text-base !bg-gradient-orange"
          >
            Nhập thông tin giao hàng
          </ButtonPrimary>
        )}
      {data.status === "paid" &&
        userLoginned &&
        userLoginned["userName"] !== data.product.seller.user_name &&
        data.product.deliveryMethod !== "self_shipping" && (
          <Button
            onClick={() => handleOpenDeliveryInformation(data)}
            className="!text-base !text-white !bg-green-600 hover:!bg-green-600 !shadow-shadowLight"
          >
            Nhập địa chỉ nhận
          </Button>
        )}
      {data.status === "delivered" &&
        userLoginned &&
        userLoginned["userName"] !== data.product.seller.user_name && (
          <Button
            onClick={() => handleReceived(data.id)}
            className="!text-base !text-white !bg-cyan-600 hover:!bg-cyan-600 !shadow-shadowLight"
          >
            Xác nhận
          </Button>
        )}
      {data.status === "received" && (
        <ButtonPrimary
          onClick={() => handleOpenModalRating(data)}
          hover="!bg-gradient-orange"
          className="!text-base !bg-gradient-orange"
        >
          Đánh giá
        </ButtonPrimary>
      )}
      <ModalDeliveryInformation
        open={openDelivery}
        setOpen={setOpenDelivery}
        type={type}
        data={order}
      />
      <ModalRating data={order} open={open} setOpen={setOpen} />
    </div>
  );
};

export default ButtonActionDetail;
