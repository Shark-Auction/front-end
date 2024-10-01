import { Divider, Form, Skeleton } from "antd";
import ProductInformation from "./components/ProductInformation";
import ProductBrand from "./components/ProductBrand";
import ProductCategory from "./components/ProductCategory";
import ProductImage from "./components/ProductImage";
import ProductDescription from "./components/ProductDescription";
import ButtonPrimary from "../../../../../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProductRequest } from "../../../../../model/product";
import { productApi } from "../../../../../service/api/productApi";
import ProductBuyNow from "./components/ProductBuyNow";

const RequestProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleFinish = async (values: ProductRequest) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.startingPrice)
        formData.append("startingPrice", values.startingPrice.toString());
      if (values.brandName) formData.append("brandName", values.brandName);
      if (values.categoryId)
        formData.append("categoryId", values.categoryId.toString());
      if (values.condition) formData.append("condition", values.condition);
      if (values.buyNow) formData.append("buyNow", String(values.buyNow));
      if (values.buyNowPrice)
        formData.append("buyNowPrice", values.buyNowPrice.toString());
      if (values.originName) formData.append("originName", values.originName);
      if (values.desiredPrice) formData.append("desiredPrice", values.desiredPrice.toString());
      if (values.deliveryMethod) formData.append("deliveryMethod", values.deliveryMethod);
      if (values.description)
        formData.append("description", values.description);

      if (values.image && values.image.length > 0) {
        formData.append("imageThumbnail", values.image[0].originFileObj);
        values.image.forEach((file: any) => {
          formData.append(`imagesFile`, file.originFileObj);
        });
      }
      await productApi.createProduct(formData);
      toast.success("Tạo sản phẩm thành công");
      form.resetFields();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl">Yêu cầu sản phẩm</p>
        <p className="text-base text-gray-500">Tạo mới sản phẩm cho đấu giá</p>
      </div>
      <Divider className="my-5" />
      <Skeleton loading={loading}>
        <Form
          onFinish={handleFinish}
          form={form}
          labelCol={{ span: 24 }}
          className="flex flex-col gap-5"
          initialValues={{
            buyNow: false,
          }}
        >
          <div className="md:grid md:grid-cols-3 gap-x-5">
            <ProductInformation />
          </div>
          <div className="md:grid md:grid-cols-3 gap-x-5">
            <ProductBrand />
          </div>
          <div className="md:grid md:grid-cols-3 gap-x-5">
            <ProductCategory />
          </div>
          <div>
            <ProductBuyNow />
          </div>
          <div>
            <ProductImage />
          </div>
          <div className="pb-10">
            <ProductDescription />
          </div>
          <Form.Item className="flex justify-center">
            <ButtonPrimary htmlType="submit" className="text-lg py-4 !px-10">
              Gửi yêu cầu
            </ButtonPrimary>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};

export default RequestProduct;
