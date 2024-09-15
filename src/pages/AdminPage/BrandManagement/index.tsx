import { Button } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";

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
    },
    {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <>
          <Button danger>Delete</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <ButtonPrimary>Add new brand</ButtonPrimary>
      <Dashboard columns={columns} apiUri="brand" action={false} />
    </>
  );
};

export default BrandManagement;
