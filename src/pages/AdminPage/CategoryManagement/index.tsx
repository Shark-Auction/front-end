import { Button, Form, Input } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { getImageCategory, getImageProduct } from "../../../utils/getImage";

const CategoryManagement = () => {
  const columns: Column[] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (data) => <ImageComponent src={getImageCategory(data)} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Danh mục con",
    //   dataIndex: "parent",
    //   key: "parent",
    // },

  ];


  const formItem = (
    <>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Plesae input the Category name!" }]}>
        <Input placeholder="Category Name"></Input>
      </Form.Item>
      <Form.Item name={"id"} hidden></Form.Item>
    </>
  )
  return (
    <>

      <Dashboard columns={columns} apiUri="category" action={true} formItem={formItem} />
    </>
  );
};

export default CategoryManagement;
