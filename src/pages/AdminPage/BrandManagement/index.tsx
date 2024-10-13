import { Form, Input } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import { formatDateHour } from "../../../utils/format";

const BrandManagement = () => {
  const columns: Column[] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDateHour(text.createdAt),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => formatDateHour(text.createdAt),
    },

  ];

  const formItem = (
    <>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Plesae input the brand name!" }]}>
        <Input placeholder="Brand Name"></Input>
      </Form.Item>
      <Form.Item name={"id"} hidden></Form.Item>
    </>
  )


  return (
    <>

      <Dashboard columns={columns} apiUri="brand" action={true} formItem={formItem} />
    </>
  );
};

export default BrandManagement;
