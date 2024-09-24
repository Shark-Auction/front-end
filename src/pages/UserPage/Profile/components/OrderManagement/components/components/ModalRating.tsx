import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  Modal,
  Rate,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import LabelForm from "../../../../../../../components/LabelForm";
import {
  RiEmotionHappyLine,
  RiEmotionLaughLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../../../../../components/Button";
import { RatingRequest } from "../../../../../../../model/rating";
import { OrderInformation } from "../../../../../../../model/order";
import { ratingApi } from "../../../../../../../service/api/ratingApi";

interface ModalRatingProps {
  open?: boolean;
  setOpen?: any;
  data?: OrderInformation;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      toast.error("Chỉ nhận file jpg/png/jpeg");
    }
    return isJpgOrPng || Upload.LIST_IGNORE; // Return false to prevent upload
  };

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
      const formData = new FormData();
      if (values.customerId)
        formData.append("customerId", values.customerId.toString());
      if (values.productId)
        formData.append("productId", values.productId.toString());
      if (values.ratingValue)
        formData.append("ratingValue", values.ratingValue.toString());
      if (values.review) formData.append("review", values.review);
      if (values.imagesFile && values.imagesFile.length > 0) {
        values.imagesFile.forEach((file: any) => {
          formData.append(`imagesFile`, file.originFileObj);
        });
      }
      await ratingApi.addRating(formData);
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
        customerId: order?.buyer?.id,
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
        <Form.Item
          label={<LabelForm>Ảnh sản phẩm:</LabelForm>}
          name={"imagesFile"}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Không được dể trống",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            accept="image/png, image/jpeg, image/jpg"
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Modal>
  );
};

export default ModalRating;
