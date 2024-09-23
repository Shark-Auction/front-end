import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, List, Modal, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
}

const BlogManagement = () => {
  const [form] = Form.useForm();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  // Handle create/update post
  const handleSubmit = (values: { title: string; description: string }) => {
    if (editingPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id
            ? { ...post, ...values, content }
            : post
        )
      );
      message.success("Post updated successfully!");
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now(),
        ...values,
        content,
      };
      setPosts((prev) => [...prev, newPost]);
      message.success("Post created successfully!");
    }
    form.resetFields();
    setContent("");
    setModalVisible(false);
    setEditingPost(null);
  };

  // Handle edit post
  const handleEdit = (post: BlogPost) => {
    form.setFieldsValue({
      title: post.title,
      description: post.description,
    });
    setContent(post.content);
    setEditingPost(post);
    setModalVisible(true);
  };

  // Handle delete post
  const handleDelete = (postId: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    message.success("Post deleted successfully!");
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <h1>Blog Manager</h1>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Create New Post
      </Button>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            actions={[
              <Button
                type="link"
                onClick={() => handleEdit(post)}
              >
                Edit
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={post.title}
              description={post.description}
            />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </List.Item>
        )}
      />

      <Modal
        title={editingPost ? "Edit Post" : "Create Post"}
        visible={modalVisible}
        onCancel={() => {
          form.resetFields();
          setEditingPost(null);
          setModalVisible(false);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              theme="snow"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManagement;
