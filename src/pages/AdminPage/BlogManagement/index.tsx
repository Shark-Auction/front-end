import { Button, Modal } from "antd";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Dashboard, { Column } from "../../../components/Dashboard";
import ImageComponent from "../../../components/Image";
import { getImageBlog } from "../../../utils/getImage";
import AddBlog from "./AddBlog";


const BlogManagement = () => {

  const [refetch, setRefetch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const column: Column[] = [
    {
      title: "#",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Blog IMG",
      key: "blogImages",
      dataIndex: "blogImages",
      render: (data) => <ImageComponent src={getImageBlog(data[0]?.url)} />,
    },

    {
      title: "Author",
      key: "user",
      dataIndex: "user",
      render: (data) => data.full_name,
    },
  ];


  // Function to handle modal open
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create New Post
      </Button>
      {/* Modal to show AddBlog component */}
      <Modal
        width={1500}
        title="Create New Blog Post"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer buttons (submit handled by form inside AddBlog)
      >
        <AddBlog />
      </Modal>
      {/* Blog Dashboard */}
      <Dashboard
        columns={column}
        apiUri={"blog/all"}
        action={false}
        refetch={refetch}
        setRefetch={setRefetch} // Pass setRefetch to Dashboard
      />


    </div>
  );
};

export default BlogManagement;
