  import React, { useState } from 'react';
  import TableComponent, { ColumnsTable } from '../../../../../../../components/Table';
  import { Image, Modal } from 'antd';

  const MyProduct = () => {
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns: ColumnsTable[] = [
      {
        title: "#",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "Remain Day",
        key: "remainDay",
        dataIndex: "remainDay",
      },
      {
        title: "Current Price",
        key: "currentPrice",
        dataIndex: "currentPrice",
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
      },
      {
        title: "Image",
        key: "image",
        dataIndex: "image",
        render: (data) => <Image width={200} src={data} />,
      },
    ];

    const handleRowClick = (record: any) => {
      setSelectedRow(record);
      setIsModalVisible(true);
    };

    // Close modal
    const handleModalClose = () => {
      setIsModalVisible(false);
      setSelectedRow(null);
    };

    return (
      <>
        <TableComponent 
          apiUri='Product' 
          columns={columns} 
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record),
            };
          }}
        />

        <Modal
          title="Product Details"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedRow && (
            <div>
              <p><strong>ID:</strong> {selectedRow.id}</p>
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Remain Day:</strong> {selectedRow.remainDay}</p>
              <p><strong>Current Price:</strong> {selectedRow.currentPrice}</p>
              <p><strong>Status:</strong> {selectedRow.status}</p>
              <Image width={200} src={selectedRow.image} />
            </div>
          )}
        </Modal>
      </>
    );
  };

  export default MyProduct;
