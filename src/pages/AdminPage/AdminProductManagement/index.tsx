import { Button, message } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import { formatDateHour } from "../../../utils/format";
import { productApi } from "../../../service/api/productApi";
import { useState } from "react";
const AdminProductManagement = () => {
  const [confirmedProducts, setConfirmedProducts] = useState<number[]>([]); // Trạng thái để lưu các sản phẩm đã được confirm


  // Hàm xử lý khi nhấn Confirm
  const handleConfirm = async (id: number) => {
    try {
      await productApi.confirmProduct(id, {});
      message.success("Product confirmed successfully!");
      setConfirmedProducts((prev) => [...prev, id]); // Thêm id vào danh sách sản phẩm đã được xác nhận
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
      title: "Full Name",
      dataIndex: "seller", // Added dataIndex here
      key: "full_name",
      render: (text) => text.full_name, // Adjusted render function

    },
    ,
    {
      title: "User Name",
      dataIndex: "seller",
      key: "user_name",
      render: (text) => text.user_name
    },
    {
      title: "Phone Number",
      dataIndex: "seller",
      key: "phone_number",
      render: (text) => text.phone_number
    },
    {
      title: "Email",
      dataIndex: "seller",
      key: "email",
      render: (text) => text.email
    },
    {
      title: "Address",
      dataIndex: "seller",
      key: "address",
      render: (text) => text.address
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
      render: (id) => (
        <>
          <Button danger onClick={() => handleConfirm(id)} disabled={confirmedProducts.includes(id)} >Confirm</Button>
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
