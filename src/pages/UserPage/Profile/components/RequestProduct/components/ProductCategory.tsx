import { Form, Input } from "antd";
import LabelForm from "../../../../../../components/LabelForm";
import { useState } from "react";

const ProductCategory = () => {
  const [category, setCategory] = useState()
  const [category1, setCategory1] = useState()
  const handleChangeCategoryParent = (e: any) => {
    setCategory(e)
  }
  const handleChangeCategory1 = (e: any) => {
    setCategory1(e)
  }
  
  return (
    <>
      <p className="text-xl text-primaryColor font-semibold col-span-3">
        Danh mục sản phẩm
      </p>
      <Form.Item label={<LabelForm>Danh mục cha:</LabelForm>}>
        <Input onChange={handleChangeCategoryParent} />
      </Form.Item>
      <Form.Item label={<LabelForm>Danh mục con 1:</LabelForm>}>
        <Input disabled={category ? false : true} onChange={handleChangeCategory1} />
      </Form.Item>
      <Form.Item name={'categoryId'} label={<LabelForm>Danh mục con 2:</LabelForm>}>
        <Input disabled={category1 ? false : true} />
      </Form.Item>
    </>
  );
};

export default ProductCategory;
