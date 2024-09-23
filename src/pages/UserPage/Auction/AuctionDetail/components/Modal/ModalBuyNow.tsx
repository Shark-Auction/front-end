import { Auction } from "../../../../../../model/auction";
import { Button, Divider, Form, Input, Modal } from "antd";
import LabelForm from "../../../../../../components/LabelForm";
import { formatVND } from "../../../../../../utils/format";
import { RootState } from "../../../../../../core/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../../../../../components/UI/underline";
import ButtonPrimary from "../../../../../../components/Button";
import { Order } from "../../../../../../model/order";
import { toast } from "react-toastify";
import { orderApi } from "../../../../../../service/api/orderApi";
import { useState } from "react";

interface ModalBuyNowProps {
  open: boolean;
  setOpen: any;
  data: Auction;
}

const ModalBuyNow = ({ open, setOpen, data }: ModalBuyNowProps) => {
  const [form] = Form.useForm();
  const userLoginned = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = async (values: Order) => {
    try {
      setLoading(true);
      await orderApi.orderAuction(values);
      toast.success("Mua ngay thành công! Hãy kiểm tra đơn hàng của bạn");
      handleCancel();
      localStorage.setItem("key", "order-mangement");
      navigate("/u/profile/order-management");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      loading={loading}
      title={
        <p className="font-normal text-lg">
          Mua ngay sản phẩm <strong>{data.product.name}</strong> với mức giá{" "}
          <strong className="text-orange-600">
            {formatVND(data.product.buyNowPrice)}
          </strong>
        </p>
      }
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} danger type="primary">
          Hủy
        </Button>,
        userLoginned && (
          <ButtonPrimary onClick={handleSubmit}>Mua ngay</ButtonPrimary>
        ),
      ]}
    >
      {userLoginned ? (
        <>
          <p className="text-xl font-semibold">Điền thông tin người nhận</p>
          <Divider className="my-4" />
          <Form
            onFinish={handleFinish}
            form={form}
            labelCol={{ span: 24 }}
            initialValues={{
              product_id: data?.product?.id,
              type: "BuyNow",
              fullName: userLoginned && userLoginned["fullName"],
            }}
          >
            <Form.Item hidden name={"product_id"} />
            <Form.Item hidden name={"type"} />
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
              name={"fullName"}
              label={<LabelForm>Tên người nhận</LabelForm>}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Tối thiểu 10 số",
                },
              ]}
              name={"phoneNumber"}
              label={<LabelForm>Số điện thoại</LabelForm>}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
              name={"toAddress"}
              label={<LabelForm>Địa chỉ nhận hàng</LabelForm>}
            >
              <Input />
            </Form.Item>
            <Form.Item name={"note"} label={<LabelForm>Ghi chú</LabelForm>}>
              <Input.TextArea />
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <p className="text-xl font-bold text-red-500">Bạn chưa đăng nhập</p>
          <Divider />
          <p className="text-xl">
            <Link
              className="text-xl text-blue-500 relative group"
              to={"/auth/login"}
            >
              Đăng nhập ngay <Underline color="blue-500" />
            </Link>
            .🔥
          </p>
          <Divider>hoặc</Divider>
          <p className="text-xl">
            {" "}
            <Link
              className="text-xl text-blue-500 relative group"
              to={"/auth/register"}
            >
              Đăng ký ngay <Underline color="blue-500" />
            </Link>
            .✍️
          </p>
        </>
      )}
    </Modal>
  );
};

export default ModalBuyNow;
