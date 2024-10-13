import { Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Dashboard, { Column } from "../../../components/Dashboard";
import { accountApi } from "../../../service/api/admin/accountAPI";
import { formatDateHour } from "../../../utils/format";

// Định nghĩa interface User
interface User {
    id: number;
    full_name: string;
    user_name: string;
    phone_number: string;
    email: string;
    address: string;
    imageUrl: string | null;
    date_of_birth: string;
    role_id: {
        id: number;
        name: string;
    };
    email_verified: boolean;
    is_active: boolean;
}

const ViolateManagement = () => {
    const [users, setUsers] = useState<User[]>([]); // State to store users

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await accountApi.getAccount(); // Call API
                if (Array.isArray(response.data)) {
                    setUsers(response.data); // Update state with user data if it's an array
                } else {
                    console.error("Expected an array, but got:", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array to call once on mount

    const columns: Column[] = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "user",
            key: "user",
            render: (data) => data.user_name,
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
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
    ];

    const formItem = (
        <>
            <Form.Item
                label="User"
                name="userId"
                rules={[{ required: true, message: "Please select a user!" }]}
            >
                <Select placeholder="Select User">
                    {users.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.user_name} {/* Display user_name for the user */}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please input the Type Violate!" }]}
            >
                <Select placeholder="Select Type">
                    <Select.Option value="non_payment">Non Payment</Select.Option>
                    <Select.Option value="spam_product">Spam Product</Select.Option>
                    <Select.Option value="no_delivery">No Delivery</Select.Option>
                    <Select.Option value="security_privacy">Security Privacy</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please input the status Violate!" }]}
            >
                <Select placeholder="Select status">
                    <Select.Option value="PENDING">PENDING</Select.Option>
                    <Select.Option value="RESOLVED">RESOLVED</Select.Option>
                    <Select.Option value="PENALIZED">PENALIZED</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please input the description Violate!" }]}
            >
                <TextArea rows={4} placeholder="Description" />
            </Form.Item>
            <Form.Item name={"id"} hidden></Form.Item>
        </>
    );

    return (
        <>
            <Dashboard columns={columns} apiUri="violate" formItem={formItem} action={true} />
        </>
    );
};

export default ViolateManagement;
