import Table, { ColumnProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../Button";
import { Button, Form, Modal, Popconfirm } from "antd";
import { toast } from "react-toastify";
import api from "../../config/axios/api";

export interface Column extends ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
}

interface DashboardProps {
  columns: Column[];
  apiUri: string;
  formItem?: React.ReactElement;
  action?: boolean;
  refetch?: boolean; // New prop for refetch
  setRefetch?: (value: boolean) => void; // New prop to set refetch state
}

const Dashboard = ({
  columns,
  apiUri,
  formItem = <></>,
  action = true,
  refetch, setRefetch
}: DashboardProps) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleEditModal = (values: any) => {
    setOpen(true);
    form.setFieldsValue(values);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setOpen(false);
  };


  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await api.get(`${apiUri}`);
      setDataSource(response.data.data);

    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsFetching(false);
    }
  };

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if (values.id) {
        await api.put(`${apiUri}/${values.id}`, values);
        toast.success(`Update ${apiUri} success`);
      } else {
        await api.post(`${apiUri}`, values);
        toast.success(`Add new ${apiUri} success`);
      }
      fetchData();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      setLoading(true);
      await api.delete(`${apiUri}/${id}`);
      toast.success(`Delete ${apiUri} success`);
      fetchData();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    form.submit();
  };

  const actionColumn: Column = {
    title: "Action",
    key: "action",
    dataIndex: "id",
    render: (_, record) => (
      <div className="flex gap-2">
        <Button type="primary" onClick={() => handleEditModal(record)}>
          Edit
        </Button>
        <Popconfirm
          title={`Are you sure to delete ${apiUri}?`}
          okText={"Yes"}
          cancelText={"No"}
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
    ),
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (refetch) {
      fetchData(); // Gọi fetchData nếu refetch là true
    }
  }, [refetch]); // Theo dõi refetch
  return (
    <>
      {action && (
        <ButtonPrimary onClick={handleOpenModal}>
          Add new {apiUri}
        </ButtonPrimary>
      )}
      <Table
        columns={action ? [...columns, actionColumn] : columns}
        dataSource={dataSource}
        loading={isFetching}
      />
      {action && (
        <Modal
          title={`${apiUri}`}
          open={open}
          onCancel={handleCloseModal}
          loading={loading}
          onOk={handleSubmit}
        >
          <Form onFinish={handleFinish} form={form} labelCol={{ span: 24 }}>
            {formItem}
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
