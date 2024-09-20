import { Button, Form, Input } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { formatDateHour } from "../../../utils/format";


const OriginManagement = () => {
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
      render: (text) => formatDateHour(text.createdAt)
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => formatDateHour(text.updatedAt)
    },

  ];
  const formItem = (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the origin name!" }]}
      >
        <Input placeholder="Origin Name" />

      </Form.Item>

      <Form.Item name={"id"} hidden></Form.Item>
    </>
  );
  return (
    <>

      <Dashboard columns={columns} apiUri="origin" formItem={formItem} action={true} />
    </>
  );
};

export default OriginManagement;
