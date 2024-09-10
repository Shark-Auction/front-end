import { Button, Form, Modal, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import ItemInformation from "./ItemInformation";
import ItemCategory from "./ItemCategory";
import ItemBrandOrigin from "./ItemBrandOrigin";
import ItemDescription from "./ItemDescription";
import { toast } from "react-toastify";
import { productApi } from "../../../../../../../../service/api/productApi";
import { ProductDetailRequest } from "../../../../../../../../model/product";

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
  const handleCancle = () => {
    setOpen(false);
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
      setLoading(false)
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        categoryId: data?.category?.id,
        brandName: data?.brand?.name,
        originName: data?.origin?.name,
        ...data,
      });
    }
  }, [data, form]);

  return (
    <Modal
      title={<p className="text-xl">Chi tiết sản phẩm</p>}
      open={open}
      loading={loading}
      onCancel={handleCancle}
      width={1000}
      footer={[
        <Popconfirm
          title={`Xóa sản phẩm ${data?.name}`}
          description="Bạn có muốn xóa không?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => handleDelete(data?.id, data?.name)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>,
        <Button onClick={() => form.submit()} type="primary">
          Sửa
        </Button>,
      ]}
    >
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
    </Modal>
  );
};

export default ModalDetail;
