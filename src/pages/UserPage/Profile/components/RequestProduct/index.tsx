import { Divider, Form } from "antd"
import ProductInformation from "./components/ProductInformation"
import ProductBrand from "./components/ProductBrand"
import ProductCategory from "./components/ProductCategory"
import ProductImage from "./components/ProductImage"
import ProductDescription from "./components/ProductDescription"
import ButtonPrimary from "../../../../../components/Button"

export const RequestProduct = () => {
  const [form] = Form.useForm()
  const handleFinish = (values: any) => {
    console.log(values)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl">Yêu cầu sản phẩm</p>
        <p className="text-base text-gray-500">Tạo mới sản phẩm cho đấu giá</p>
      </div>
      <Divider className="my-5" />
      <Form onFinish={handleFinish} form={form} labelCol={{span: 24}} className="">
        <div className="grid grid-cols-3 gap-x-5">
          <ProductInformation />
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <ProductBrand />
        </div>
        <div className="grid grid-cols-3 gap-x-5">
          <ProductCategory />
        </div>
        <div>
          <ProductImage />
        </div>
        <div className="pb-10">
          <ProductDescription />
        </div>
        <Form.Item className="flex justify-center">
          <ButtonPrimary htmlType="submit" className="text-lg py-4 !px-10">Gửi yêu cầu</ButtonPrimary>
        </Form.Item>
      </Form>
    </div>
  )
}
