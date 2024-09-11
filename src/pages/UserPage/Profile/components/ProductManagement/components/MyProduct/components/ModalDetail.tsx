import { Button, Form, Modal, Popconfirm, Steps } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { productApi } from "../../../../../../../../service/api/productApi";
import { ProductDetailRequest } from "../../../../../../../../model/product";
import ItemBrandOrigin from "./ModalEdit/ItemBrandOrigin";
import ItemInformation from "./ModalEdit/ItemInformation";
import ItemCategory from "./ModalEdit/ItemCategory";
import ItemDescription from "./ModalEdit/ItemDescription";
import ButtonPrimary from "../../../../../../../../components/Button";
import AddAuction from "./ModalAddAuction/AddAuction";
import { auctionApi } from "../../../../../../../../service/api/auctionApi";

interface ModalDetailProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setRender: any;
}

const ModalDetail = ({ open, setOpen, data, setRender }: ModalDetailProps) => {
  const [form] = Form.useForm();
  const [imageDescription, setImageDescription] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancle = () => {
    setOpen(false);
    setCurrent(0);
    form.resetFields();
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      setLoading(true);
      await productApi.deleteProduct(id);
      toast.success(`Xóa sản phẩm ${name} thành công`);
      setRender(true);
      handleCancle();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values: ProductDetailRequest) => {
    try {
      setLoading(true);
      await productApi.editProduct(data?.id, values);
      toast.success("Cập nhật thành công");
      setRender(true);
      handleCancle();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuction = async (values: any) => {
    try {
      const startTime = values.dateRange
        ? values.dateRange[0].format("YYYY-MM-DD HH:mm")
        : "";
      const endTime = values.dateRange
        ? values.dateRange[1].format("YYYY-MM-DD HH:mm")
        : "";
      const step = values.step || 0;
      const formData = {
        productId: data?.id,
        startTime,
        endTime,
        step,
      };
      setLoading(true);
      await auctionApi.addAuction(formData);
      toast.success("Đăng sản phẩm lên trang đấu giá thành công");
      setRender(true);
      handleCancle();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false)
    }
  };

  const steps = [
    {
      title: "Chi tiết sản phẩm",
      content: (
        <Form
          form={form}
          onFinish={handleEdit}
          labelCol={{ span: 24 }}
          className="grid grid-cols-4 gap-x-5"
        >
          <ItemInformation />
          <ItemCategory />
          <ItemBrandOrigin />
          <ItemDescription setImageDescription={setImageDescription} />
        </Form>
      ),
    },
    {
      title: "Đăng đấu giá",
      content: (
        <Form
          onFinish={handleAddAuction}
          initialValues={{
            step: data?.startingPrice && data?.startingPrice,
          }}
          labelCol={{ span: 24 }}
          className="grid grid-cols-2 gap-x-5"
          form={form}
        >
          <AddAuction data={data} />
        </Form>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    if (open && data) {
      const stepValue = data.startingPrice * 0.05;
      form.setFieldsValue({
        step: stepValue,
      });
      form.setFieldsValue({
        categoryId: data?.category?.id,
        brandName: data?.brand?.name,
        originName: data?.origin?.name,
        ...data,
      });
    }
  }, [data, form, open]);

  return (
    <Modal
      title={<p className="text-xl">Chi tiết sản phẩm</p>}
      open={open}
      loading={loading}
      onCancel={handleCancle}
      width={1000}
      footer={[
        current < steps.length - 1 && (
          <>
            <Popconfirm
              title={`Xóa sản phẩm ${data?.name}`}
              description="Bạn có muốn xóa không?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => handleDelete(data?.id, data?.name)}
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Button onClick={() => form.submit()} type="primary">
              Sửa
            </Button>
            <ButtonPrimary className="text-base" onClick={() => next()}>
              Đăng lên trang đấu giá
            </ButtonPrimary>
          </>
        ),
        current > 0 && (
          <>
            <Button key="back" onClick={prev}>
              Trở lại
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              Đăng đấu giá
            </Button>
          </>
        ),
      ]}
    >
      <Steps current={current} items={items} />
      <div className="steps-content mt-5">{steps[current].content}</div>
    </Modal>
  );
};

export default ModalDetail;
