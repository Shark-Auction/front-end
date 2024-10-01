import { Auction } from "../../../../../../model/auction";
import { Button, Divider, Form, Input, Modal, Select } from "antd";
import LabelForm from "../../../../../../components/LabelForm";
import { formatVND } from "../../../../../../utils/format";
import { RootState } from "../../../../../../core/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../../../../../components/UI/underline";
import ButtonPrimary from "../../../../../../components/Button";
import { Order, OrderRequestData } from "../../../../../../model/order";
import { toast } from "react-toastify";
import { orderApi } from "../../../../../../service/api/orderApi";
import { useEffect, useState } from "react";

interface ModalBuyNowProps {
  open: boolean;
  setOpen: any;
  data: Auction;
}

const ModalBuyNow = ({ open, setOpen, data }: ModalBuyNowProps) => {
  const [form] = Form.useForm();
  const userLoginned = useSelector((state: RootState) => state.user);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isDistrict, setIsDisctrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setIsDisctrict(false);
    setIsWard(false);
  };
  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = async (values: OrderRequestData) => {
    try {
      const toAddress = `${values.address}, ${values.ward.label}, ${values.district.label}, ${values.province.label}.`;
      const dataForm: Order = {
        toAddress: toAddress,
        fullName: values.fullName,
        note: values.note || "Người dùng để trống",
        phoneNumber: values.phoneNumber,
        product_id: values.product_id,
        type: values.type,
      };
      setLoading(true);
      await orderApi.orderAuction(dataForm);
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
  const handleDistrict = async (province: {
    value: string;
    label: React.ReactNode;
  }) => {
    if (province) {
      const response = await orderApi.getDistrictApi(province.value);
      const optionResponse = response.data.map((e: any) => ({
        label: e.DistrictName,
        value: e.DistrictID,
      }));
      setDistrict(optionResponse);
      setIsDisctrict(true);
    } else {
      setIsDisctrict(false);
      setIsWard(false);
      form.setFieldsValue({
        district: null,
        ward: null,
      });
    }
  };
  const handleWard = async (district: any) => {
    if (district) {
      const response = await orderApi.getWardApi(district.value);
      const optionResponse = await response.data.map((e: any) => ({
        label: e.WardName,
        value: e.WardCode,
      }));
      setWard(optionResponse);
      setIsWard(true);
    } else {
      setIsWard(false);
      form.setFieldsValue({
        ward: null,
      });
    }
  };
  const fetchDataCity = async () => {
    try {
      setLoading(true);
      const responseProvince = await orderApi.getProvinceApi();
      const optionResponse = responseProvince.data.map((e: any) => ({
        label: e.ProvinceName,
        value: e.ProvinceID,
      }));
      setProvince(optionResponse);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchDataCity();
    }
  }, [open]);

  return (
    <Modal
      width={700}
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
            <div className="md:grid grid-cols-3 gap-x-2">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
                name={"province"}
                label={<LabelForm>Chọn tỉnh/thành phố</LabelForm>}
              >
                <Select
                  placeholder="Chọn tỉnh/thành"
                  labelInValue
                  options={province}
                  optionFilterProp="children"
                  showSearch
                  allowClear
                  onChange={handleDistrict}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
                name={"district"}
                label={<LabelForm>Chọn quận/thị xã</LabelForm>}
              >
                <Select
                  placeholder="Chọn quận/thị xã"
                  labelInValue
                  options={district}
                  optionFilterProp="children"
                  showSearch
                  onChange={handleWard}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={!isDistrict}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
                name={"ward"}
                label={<LabelForm>Chọn phường</LabelForm>}
              >
                <Select
                  placeholder="Chọn phường"
                  labelInValue
                  options={ward}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={!isWard}
                  allowClear
                />
              </Form.Item>
            </div>
            <Form.Item
              name={"address"}
              label={<LabelForm>Địa chỉ</LabelForm>}
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
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
