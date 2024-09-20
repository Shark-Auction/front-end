import React, { useState } from 'react';
import { Button, message, Table } from 'antd';
import Dashboard, { Column } from "../../../components/Dashboard";
import { formatDateHour } from "../../../utils/format";
import { productApi } from "../../../service/api/productApi";
import ImageComponent from "../../../components/Image";
import { getImageProduct } from "../../../utils/getImage";
import ProductDetailModal from './ProductDetailModal';  // Import the modal

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
      title: "User Name",
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
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => text.name,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => text.name,
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      render: (text) => text.name,
    },
    { title: "Condition", dataIndex: "condition", key: "condition" },
    { title: "Status", dataIndex: "status", key: "status" },
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
          <Button danger onClick={() => handleConfirm(id)} disabled={record.status === "AUCTIONING"}>
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

