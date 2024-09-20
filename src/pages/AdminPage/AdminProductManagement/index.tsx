import { Button, message } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import { formatDateHour } from "../../../utils/format";
import { productApi } from "../../../service/api/productApi";
import ImageComponent from "../../../components/Image";
import { getImageProduct } from "../../../utils/getImage";

const AdminProductManagement = () => {

  // Hàm xử lý khi nhấn Confirm
  const handleConfirm = async (id: number) => {
    try {
      await productApi.confirmProduct(id, {});
      message.success("Product confirmed successfully!");

    } catch (error: any) {
      message.error(`Error: ${error.message || "Unable to confirm product"}`);
    }
  };
  const columns: Column[] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "User Name",
      dataIndex: "seller", // Added dataIndex here
      key: "user_name",
      render: (text) => text.user_name, // Adjusted render function

    },

    {
      title: "Product Name",
      dataIndex: "name", // Added dataIndex here
      key: "name",

    },
    {
      title: "Product IMG",
      key: "product_images",
      dataIndex: "thumbnail",
      render: (data) => <ImageComponent src={getImageProduct(data)} />,
    },
    {
      title: "Category",
      dataIndex: "category", // Added dataIndex here
      key: "category",
      render: (text) => text.name
    },
    {
      title: "Brand ",
      dataIndex: "brand", // Added dataIndex here
      key: "brand",
      render: (text) => text.name
    },
    {
      title: "Origin ",
      dataIndex: "origin", // Added dataIndex here
      key: "origin",
      render: (text) => text.name
    },
    {
      title: "Condition ",
      dataIndex: "condition", // Added dataIndex here
      key: "condition",
      // render: (text) => text.name
    },
    {
      title: "Status ",
      dataIndex: "status", // Added dataIndex here
      key: "status",
      // render: (text) => text.name
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
      render: (text) => formatDateHour(text.updatedAt),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <>
          <Button danger onClick={() => handleConfirm(id)} disabled={record.status === "AUCTIONING"} >Confirm</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Dashboard columns={columns} apiUri="product" action={false} />
    </>
  );
};

export default AdminProductManagement;
