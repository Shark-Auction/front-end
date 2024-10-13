import { Form, Input } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ImageComponent from "../../../components/Image";
import { getImageProduct } from "../../../utils/getImage";

const AuctionManagement = () => {
  const column: Column[] = [
    {
      title: "#",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Product",
      key: "name",
      dataIndex: "product",
      render: (text) => (text.name)
    },
    {
      title: "Product IMG",
      key: "product_images",
      dataIndex: "product",
      render: (data) => <ImageComponent src={getImageProduct(data.thumbnail)} />,
    },
    {
      title: "Seller",
      key: "full_name",
      dataIndex: "product",
      render: (text) => (text.seller.full_name)
    },
    {
      title: "currentPrice",
      key: "currentPrice",
      dataIndex: "currentPrice",
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
    },

  ];
  const formItem = (
    <>
      <Form.Item label={"Name"} name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Remain Day"} name={"remainDay"}>
        <Input />
      </Form.Item>
      <Form.Item label="Current Price" name={"currentPrice"}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name={"status"}>
        <Input />
      </Form.Item>
      <Form.Item label="Image" name={"image"}>
        <Input />
      </Form.Item>
      <Form.Item name={"id"} hidden></Form.Item>
    </>
  );
  return <Dashboard columns={column} formItem={formItem} apiUri={"auction"} />;
};

export default AuctionManagement;
