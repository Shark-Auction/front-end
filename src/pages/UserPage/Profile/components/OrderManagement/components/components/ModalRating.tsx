import {
  Button,
  Form,
  Input,
  Modal,
  Rate
} from "antd";
import { useEffect, useState } from "react";
import {
  RiEmotionHappyLine,
  RiEmotionLaughLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../../../../../components/Button";
import LabelForm from "../../../../../../../components/LabelForm";
import { OrderInformation } from "../../../../../../../model/order";
import { RatingRequest } from "../../../../../../../model/rating";
import { ratingApi } from "../../../../../../../service/api/ratingApi";

interface ModalRatingProps {
  open?: boolean;
  setOpen?: any;
  data?: OrderInformation;
}

const customIcons: Record<number, React.ReactNode> = {
  1: <RiEmotionSadLine className="text-red-500" />,
  2: <RiEmotionUnhappyLine className="text-orange-500" />,
  3: <RiEmotionNormalLine className="text-yellow-500" />,
  4: <RiEmotionHappyLine className="text-blue-600" />,
  5: <RiEmotionLaughLine className="text-green-600" />,
};

const ModalRating = ({ open, setOpen, data }: ModalRatingProps) => {
  const [selected, setSelected] = useState<number>();
  const [form] = Form.useForm();
  const [order, setOrder] = useState<OrderInformation>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
    setOrder(undefined);
    setSelected(0);
    form.resetFields();
  };
  const handleRateChange = (value: number) => {
    setSelected(value);
  };

  const handleFinish = async (values: RatingRequest) => {
    try {
      setLoading(true);
      await ratingApi.addRating(values);
      toast.success("Cảm ơn đã đánh giá sản phẩm");
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setOrder(data);
      form.setFieldsValue({
        productId: order?.product?.id,
      });
    }
  }, [data, form, open, order?.buyer?.id, order?.product?.id]);

  return (
    <Modal
      loading={loading}
      title="Đánh giá sản phẩm"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key={'cancel'} className="text-base px-8">Hủy</Button>,
        <ButtonPrimary key={'sendReview'} onClick={() => form.submit()}>
          Gửi đánh giá
        </ButtonPrimary>,
      ]}
    >
      <Form labelCol={{ span: 24 }} form={form} onFinish={handleFinish}>
        <Form.Item name={"customerId"} hidden />
        <Form.Item name={"productId"} hidden />
        <Form.Item
          name={"ratingValue"}
          label={<LabelForm>Đánh giá sản phẩm:</LabelForm>}
          rules={[{ required: true, message: "Không được để trông" }]}
        >
          <Rate
            className="md:!text-6xl flex gap-2 justify-between"
            onChange={handleRateChange}
            character={({ index = 0 }) => {
              const iconIndex = index + 1;
              const isSelected = selected === iconIndex;

              return (
                <span
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    transition: "background-color 0.3s",
                  }}
                  className={`${
                    isSelected ? "bg-gradient-rating" : "bg-transparent"
                  }`}
                >
                  {customIcons[iconIndex]}
                </span>
              );
            }}
          />
        </Form.Item>
        <Form.Item name={"review"} label={<LabelForm>Nhận xét:</LabelForm>}>
          <Input.TextArea size="large"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRating;
