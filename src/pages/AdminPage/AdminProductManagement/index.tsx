import { Button, message, Tag } from 'antd';
import { useState } from 'react';
import Dashboard, { Column } from "../../../components/Dashboard";
import ImageComponent from "../../../components/Image";
import { productApi } from "../../../service/api/productApi";
import { formatDateHour } from "../../../utils/format";
import { getImageProduct } from "../../../utils/getImage";
import ProductDetailModal from './ProductDetailModal'; // Import the modal


const AdminProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Store selected product
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const handleConfirm = async (id: number) => {
    try {
      await productApi.confirmProduct(id, {});
      message.success("Product confirmed successfully!");
    } catch (error: any) {
      message.error(`Error: ${error.message || "Unable to confirm product"}`);
    }
  };

  const handleProductNameClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const columns: Column[] = [
    { title: "#", dataIndex: "id", key: "id" },
    {
      title: "Seller Name",
      dataIndex: "seller",
      key: "user_name",
      render: (text) => text.user_name,

    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => handleProductNameClick(record)} style={{ cursor: 'pointer', color: '#1890ff' }}>
          {text}
        </a>
      ),
    },
    {
      title: "Product IMG",
      key: "product_images",
      dataIndex: "thumbnail",
      render: (data) => <ImageComponent src={getImageProduct(data)} />,
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   render: (text) => text.name,
    // },
    // {
    //   title: "Brand",
    //   dataIndex: "brand",
    //   key: "brand",
    //   render: (text) => text.name,
    // },
    // {
    //   title: "Origin",
    //   dataIndex: "origin",
    //   key: "origin",
    //   render: (text) => text.name,
    // },
    {
      title: "Starting Price",
      dataIndex: "startingPrice",
      key: "startingPrice",
      render: (price) => {
        let color = "geekblue";

        if (price < 100) {
          color = "green";  // Low price
        } else if (price >= 100 && price < 500) {
          color = "gold";  // Medium price
        } else {
          color = "volcano";  // High price
        }

        return (
          <Tag color={color}>
            {`$${price}`}
          </Tag>
        );
      },
    }
    ,
    {
      title: "Condition", dataIndex: "condition", key: "condition",
      filters: [
        { text: 'AVERAGENEW', value: 'AVERAGENEW' },
        { text: 'LOWNEW', value: 'LOWNEW' },
      ],
      onFilter: (value, record) => record.condition === value
    },
    {
      title: "Status", dataIndex: "status", key: "status",
      filters: [
        { text: 'AUCTIONING', value: 'AUCTIONING' },
        { text: 'PENDING', value: 'PENDING' },
        { text: 'COMPLETED', value: 'COMPLETED' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color;
        switch (status) {
          case 'AUCTIONING':
            color = 'blue';
            break;
          case 'PENDING':
            color = 'gold';
            break;
          case 'COMPLETED':
            color = 'green';
            break;
          default:
            color = 'volcano';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDateHour(text.createdAt),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(), // Sort by date
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => formatDateHour(text.updatedAt),
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(), // Sort by date
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, record) => (
        <>
          <Button type="primary" onClick={() => handleConfirm(id)} disabled={record.status !== "PENDING"}>
            Confirm
          </Button>
        </>
      ),
    },
  ];

  return (

    <>

      <Dashboard columns={columns} apiUri="product" action={false} />

      {/* Product Details Modal */}
      <ProductDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />


    </>
  );
};

export default AdminProductManagement;

