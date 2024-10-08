import { Form, Input, InputNumber, Modal, Skeleton } from "antd";
import SelectAddress from "./SelectAddress";
import ButtonPrimary from "../../../../../../../components/Button";
import { OrderInformation } from "../../../../../../../model/order";
import { useEffect, useState } from "react";
import {
  Delivery,
  DeliveryDetailSeller,
  DeliveryRequestReceiver,
} from "../../../../../../../model/delivery";
import LabelForm from "../../../../../../../components/LabelForm";
import { toast } from "react-toastify";
import { deliveryApi } from "../../../../../../../service/api/deliveryApi";

interface ModalDeliveryInformationProp {
  open: boolean;
  setOpen: any;
  type: string;
  data?: OrderInformation;
}

const ModalDeliveryInformation = ({
  open,
  setOpen,
  type,
  data,
}: ModalDeliveryInformationProp) => {
  const [form] = Form.useForm();
  const [order, setOrder] = useState<OrderInformation>();
  const [dataDelivery, setDataDelivery] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setOpen(false);
    setOrder(undefined);
    form.resetFields();
  };
  const handleFinishBuyer = async (values: any) => {
    const formItem: DeliveryRequestReceiver = {
      payment_type_id: 1,
      productID: order ? order.product.id : 0,
      service_type_id: values.serviceID,
      to_address: values.address,
      to_district_id: values.district.value,
      to_name: values.name,
      to_phone: values.phoneNumber,
      to_ward_code: values.ward.label,
    };
    try {
      setLoading(true);
      await deliveryApi.receiverDelivery(formItem);
      toast.success("Cảm ơn quý khách đã điền thông tin!");
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishSeller = async (values: any) => {
    const formItem: DeliveryDetailSeller = {
      from_address: values.address,
      from_district_name: values.district.label,
      from_name: values.name,
      from_phone: values.phoneNumber,
      from_province_name: values.province.label,
      from_ward_name: values.ward.label,
      height: values.height,
      length: values.length,
      note: values.note,
      productID: order ? order.product.id : 0,
      weight: values.weight,
      width: values.width,
    };
    try {
      setLoading(true);
      await deliveryApi.sellerDelivery(
        dataDelivery && dataDelivery.length > 0 ? dataDelivery[0].id : 0,
        formItem
      );
      toast.success("Cảm ơn quý khách đã điền thông tin!");
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchDelivery = async (id: number) => {
      try {
        setLoading(true);
        const response = await deliveryApi.getDeliveryByOrder(id);
        form.setFieldsValue({
          nameData: response.data[0].toName,
          phoneNumberData: response.data[0].toPhone,
          addressData: response.data[0].toAddress,
        });
        setDataDelivery(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (open && data) {
      setOrder(data);
      fetchDelivery(data.id);
    }
  }, [data, form, open]);
  return (
    <Modal
      title={"Nhập thông tin"}
      width={1000}
      open={open}
      onCancel={handleCancel}
      footer={[
        type === "buyer" && dataDelivery && dataDelivery.length === 0 && (
          <ButtonPrimary key={"submit"} onClick={() => form.submit()}>
            Gửi thông tin
          </ButtonPrimary>
        ),
        type === "seller" && (
          <ButtonPrimary key={"submit"} onClick={() => form.submit()}>
            Gửi thông tin
          </ButtonPrimary>
        ),
      ]}
    >
      <Skeleton loading={loading}>
        {type === "buyer" ? (
          <>
            {dataDelivery && dataDelivery.length === 0 ? (
              <Form
                form={form}
                onFinish={handleFinishBuyer}
                labelCol={{ span: 24 }}
              >
                <Form.Item
                  name={"name"}
                  label={<LabelForm>Tên người nhận:</LabelForm>}
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"phoneNumber"}
                  label={<LabelForm>Số điện thoại:</LabelForm>}
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Tối thiểu 10 số",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <SelectAddress />
                <Form.Item hidden name={"productID"} />
                <Form.Item hidden name={"payment_type_id"} />
                <Form.Item hidden name={"serviceID"} />
              </Form>
            ) : (
              <Form form={form} labelCol={{ span: 24 }}>
                <Form.Item
                  name={"nameData"}
                  label={<LabelForm>Tên người nhận:</LabelForm>}
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"phoneNumberData"}
                  label={<LabelForm>Số điện thoại:</LabelForm>}
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Tối thiểu 10 số",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"addressData"}
                  label={<LabelForm>Địa chỉ:</LabelForm>}
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Tối thiểu 10 số",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            )}
          </>
        ) : (
          <Form
            disabled={dataDelivery && dataDelivery.length === 0 ? true : false}
            form={form}
            onFinish={handleFinishSeller}
            labelCol={{ span: 24 }}
          >
            <Form.Item
              name={"name"}
              label={<LabelForm>Tên người nhận:</LabelForm>}
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"phoneNumber"}
              label={<LabelForm>Số điện thoại:</LabelForm>}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Tối thiểu 10 số",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="grid grid-cols-3 gap-3">
              <Form.Item
                rules={[{ required: true, message: "Không được để trống" }]}
                name={"weight"}
                label={<LabelForm>Cân nặng (g): </LabelForm>}
              >
                <InputNumber className="!w-full" controls={false} />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Không được để trống" }]}
                name={"length"}
                label={<LabelForm>Độ dài (cm): </LabelForm>}
              >
                <InputNumber className="!w-full" controls={false} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Form.Item
                rules={[{ required: true, message: "Không được để trống" }]}
                name={"width"}
                label={<LabelForm>Chiều dài (cm): </LabelForm>}
              >
                <InputNumber className="!w-full" controls={false} />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Không được để trống" }]}
                name={"height"}
                label={<LabelForm>Chiều cao (cm): </LabelForm>}
              >
                <InputNumber className="!w-full" controls={false} />
              </Form.Item>
            </div>
            <SelectAddress />
            <Form.Item name={"note"} label={<LabelForm>Ghi chú</LabelForm>}>
              <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item hidden name={"productID"} />
          </Form>
        )}
      </Skeleton>
    </Modal>
  );
};

export default ModalDeliveryInformation;
