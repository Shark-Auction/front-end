import { Button } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";

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
      render: (data) => <ImageComponent src={data} />,
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
      <ButtonPrimary>Add new category</ButtonPrimary>
      <Dashboard columns={columns} apiUri="category" action={false} />
    </>
  );
};

export default CategoryManagement;
