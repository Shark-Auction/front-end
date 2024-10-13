import { Form, Input, Skeleton } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/Button";
import { blogApi } from "../../../service/api/admin/blogAPI";
import BlogImageUpload from "./BlogImage";
import ContentBlog from "./ContentBlog";

const AddBlog = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      console.log(values);
      if (values.title) {
        formData.append("title", values.title);
      }
      if (values.content) {
        formData.append("content", values.content);
      }
      if (values.image && values.image.length > 0) {
        values.image.forEach((file: any) => {
          formData.append("images", file.originFileObj);
        });
      }
      // Gọi API để thêm blog
      await blogApi.addBlog(formData);
      toast.success("Blog added successfully");
      form.resetFields();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl">Add New Blog</p>
      </div>
      <Skeleton loading={loading}>
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          className="flex flex-col gap-5"
        >
          {/* Blog Title */}
          <Form.Item
            name="title"
            label="Blog Title"
            rules={[
              { required: true, message: "Please input the blog title!" },
            ]}
          >
            <Input placeholder="Enter the blog title" />
          </Form.Item>
          {/* Blog Content */}
          <ContentBlog />
          {/* Blog Image Upload */}
          <BlogImageUpload /> {/* Thêm component BlogImageUpload vào đây */}
          {/* Submit Button */}
          <Form.Item className="flex justify-center">
            <ButtonPrimary htmlType="submit" className="text-lg py-4 !px-10">
              Add Blog
            </ButtonPrimary>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};

export default AddBlog;
