import { Button } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { formatDateHour } from "../../../utils/format";

const AdminProductManagement = () => {
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
      render: (id, record) => (
        <>
          <Button danger>Confirm</Button>
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
