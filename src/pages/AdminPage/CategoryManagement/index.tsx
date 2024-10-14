import { Button, Form, Input, Modal, Popconfirm, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Column } from "../../../components/Dashboard";
import ImageComponent from "../../../components/Image";
import { categoryApi } from "../../../service/api/admin/categoryApi";
import { getImageCategory } from "../../../utils/getImage";
import { Category } from "../../../model/category";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/Button";
import CategoryImageUpload from "./CategoryImage";
import { Option } from "antd/es/mentions";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [refetch, setRefetch] = useState(false); // State to manage refetch

  const refreshData = () => {
    setRefetch(true); // Trigger refetch when needed
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryApi.getCategory();
        if (response && response.data) {
          setCategories(response.data);
        }
      } catch (error: any) {
        toast.error(
          "Error fetching categories: " + error.response?.data?.message
        );
      } finally {
        setLoading(false);
        setRefetch(false); // Reset refetch after fetching
      }
    };

    // Fetch categories on component mount or when refetch changes

    fetchCategories();

  }, [refetch]);

  const handleDeleteCategory = async (id: number) => {
    try {
      setLoading(true);
      await categoryApi.deleteCategory(id);
      toast.success("Category deleted successfully");
      refreshData(); // Refresh data after deletion
    } catch (error: any) {
      toast.error("Error deleting category: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      console.log(values);
      if (values.name) {
        formData.append("name", values.name);
      }
      if (values.parent_id) {
        formData.append("parent_id", values.parent_id);
      }
      if (values.imageThumbnail && values.imageThumbnail.length > 0) {
        values.imageThumbnail.forEach((file: any) => {
          formData.append("imageThumbnail", file.originFileObj);
        });
      }
      // Call API to add category
      await categoryApi.addCategory(formData);
      toast.success("Category added successfully");
      setIsModalVisible(false);
      form.resetFields(); // Reset form fields
      refreshData(); // Refresh data after adding a category
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameClick = async (parentId: number) => {
    try {
      setLoading(true);
      const response = await categoryApi.getCategoryChildren(parentId);
      setChildCategories(response);
    } catch (error: any) {
      toast.error(
        "Error fetching child categories: " + error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setChildCategories([]);
  };

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
      render: (data) => <ImageComponent src={getImageCategory(data)} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => (
        <Tag color="blue" className="!text-lg !font-semibold !px-10">
          {data}
        </Tag>
      ),
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      render: (_, record: any) => (
        <Button
          type="link"
          className="!text-lg !font-semibold"
          onClick={() => handleNameClick(record.id)}
        >
          View children category
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, record: any) => (
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDeleteCategory(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="link">
            Delete
          </Button>
        </Popconfirm>
      ),
    }
  ];

  const parentCategories = categories.filter(
    (category) => category.parent === null
  );

  return (
    <>
      <Form.Item>
        <ButtonPrimary
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Add Category
        </ButtonPrimary>
      </Form.Item>
      <Table
        loading={loading}
        dataSource={parentCategories}
        columns={columns}
        rowKey="id"
      />
      <Modal
        title="Child Categories"
        open={isModalOpen}
        width={700}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <Table
          loading={loading}
          dataSource={childCategories}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Image",
              dataIndex: "imageUrl",
              key: "image",
              render: (data) => <ImageComponent src={getImageCategory(data)} />,
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
          ]}
          rowKey="id"
          pagination={false}
        />
      </Modal>
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Category Name */}
          <Form.Item
            name="name"
            label="Category name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input placeholder="Enter the category name" />
          </Form.Item>
          {/* Parent Id */}
          <Form.Item name="parent_id" label="Parent">
            <Select placeholder="Select a parent category">
              {parentCategories.map((category) => (
                <Option key={category.id.toString()} value={category.id.toString()}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Image Upload */}

          <CategoryImageUpload /> {/* Add image upload component */}
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManagement;
