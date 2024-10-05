// import { Button, Form, Input, Modal, Table } from "antd";
// import Dashboard, { Column } from "../../../components/Dashboard";
// import ButtonPrimary from "../../../components/Button";
// import ImageComponent from "../../../components/Image";
// import { getImageCategory } from "../../../utils/getImage";
// import { useEffect, useState } from "react";
// import { categoryApi } from "../../../service/api/admin/categoryApi";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]); // State to store all categories
//   const [categoryParents, setCategoryParents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await categoryApi.getCategory(); // Call API to get categories
//         if (response && response.data) {
//           // Lọc các category có parent bằng null
//           const parentCategories = response.data.filter((category: any) => category.parent === null);
//           setCategories(response.data); // Lưu tất cả các categories vào state
//           setCategoryParents(parentCategories); // Lưu các categories có parent = null vào state
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []); // Run once on component mount
//   // const fetchCategoryParent = async (categoryId: number) => {
//   //   try {
//   //     const data = await categoryApi.getCategoryParent(categoryId);
//   //     if (Array.isArray(data)) {
//   //       setCategoryParents(data);
//   //     } else {
//   //       console.error("Expected an array but received:", data);
//   //       setCategoryParents([]); // Clear the state or handle the error case
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching category parents:", error);
//   //     setCategoryParents([]); // Handle error by setting empty array
//   //   }
//   // };

//   const handleNameClick = (categoryId: number) => {
//     setSelectedCategoryId(categoryId);
//     // fetchCategoryParent(categoryId);
//     setIsModalOpen(true); // Open the modal
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setCategoryParents([]); // Clear parent categories when closing the modal
//   };

//   const columns: Column[] = [
//     {
//       title: "#",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Image",
//       dataIndex: "imageUrl",
//       key: "image",
//       render: (data) => <ImageComponent src={getImageCategory(data)} />,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text: string, record: any) => (
//         <Button type="link" onClick={() => handleNameClick(record.id)}>
//           {text}
//         </Button>
//       ),
//     },
//     {
//       title: "Parent",
//       dataIndex: "parent",
//       key: "parent",
//       render: (data) => data ? 'day la con' : ' day la parent'
//     },
//   ];

//   const formItem = (
//     <>
//       <Form.Item
//         label="Name"
//         name="name"
//         rules={[{ required: true, message: "Please input the Category name!" }]}
//       >
//         <Input placeholder="Category Name" />
//       </Form.Item>
//       <Form.Item name={"id"} hidden></Form.Item>
//     </>
//   );

//   return (
//     <>
//       <Dashboard columns={columns} apiUri="category" action={true} formItem={formItem} dataSource={categoryParents} />

//       {/* Modal for displaying parent categories */}
//       <Modal
//         title="Parent Categories"
//         visible={isModalOpen}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="close" onClick={handleModalClose}>
//             Close
//           </Button>,
//         ]}
//       >
//         <Table
//           dataSource={categoryParents}
//           columns={[
//             {
//               title: "ID",
//               dataIndex: "id",
//               key: "id",
//             },
//             {
//               title: "Name",
//               dataIndex: "name",
//               key: "name",
//             },
//           ]}
//           rowKey="id"
//           pagination={false}
//         />
//       </Modal>
//     </>
//   );
// };

// export default CategoryManagement;
import { Button, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Column } from "../../../components/Dashboard";
import ImageComponent from "../../../components/Image";
import { categoryApi } from "../../../service/api/admin/categoryApi";
import { getImageCategory } from "../../../utils/getImage";
import { Category } from "../../../model/category";
import { toast } from "react-toastify";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
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
          "Error fetching child categories: " + error.response.data.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNameClick = async (parentId: number) => {
    try {
      setLoading(true);
      const response = await categoryApi.getCategoryChildren(parentId);
      setChildCategories(response);
    } catch (error: any) {
      toast.error(
        "Error fetching child categories: " + error.response.data.message
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
      render: (data) => <Tag color="blue" className="!text-lg !font-semibold !px-10">{data}</Tag>
    },
    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      render: (_, record: any) => (
        <Button type="link" className="!text-lg !font-semibold" onClick={() => handleNameClick(record.id)}>
          View children category
        </Button>
      ),
    },
  ];
  const parentCategories = categories.filter(
    (category) => category.parent === null
  );
  return (
    <>
      <Table
        loading={loading}
        dataSource={parentCategories}
        columns={columns}
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
    </>
  );
};

export default CategoryManagement;
