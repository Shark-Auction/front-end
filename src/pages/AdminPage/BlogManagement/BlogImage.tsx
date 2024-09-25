import React, { useState } from "react";
import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import type { UploadFile, UploadProps } from "antd";

// Hàm getImageBlog của bạn
export const getImageBlog = (imageUrl: string) => {
    return `http://api.sharkauction.online/uploads/blogs/${imageUrl}`;
};

const BlogImageUpload: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg";
        if (!isJpgOrPng) {
            toast.error("Chỉ nhận file jpg/png/jpeg");
            return Upload.LIST_IGNORE; // Prevent upload
        }
        return isJpgOrPng;
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
        const imageUrl = getImageBlog(file.name); // Sử dụng API GET để lấy ảnh
        toast.info(`Preview: ${imageUrl}`);
    };


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Form.Item
            label="Upload Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
        // rules={[{ required: true, message: "Please upload an image!" }]}
        >
            <Upload
                name="image"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}

                accept="image/png, image/jpeg, image/jpg"
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
        </Form.Item>
    );
};

export default BlogImageUpload;
