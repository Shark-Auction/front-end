import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import Dashboard, { Column } from "../../../components/Dashboard";
import { staffApi } from "../../../service/api/admin/accountAPI";


const StaffManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const [refetch, setRefetch] = useState(false); // State để quản lý refetch
    const [form] = Form.useForm(); // Ant Design Form instance
    const refreshData = () => {
        setRefetch(true); // Đặt refetch thành true khi cần fetch lại
    };

    const handleAddStaff = async (values: any) => {
        try {
            await staffApi.addStaff(values);
            message.success("Staff added successfully");
            setIsModalVisible(false);
            form.resetFields(); // Reset form fields
            refreshData(); // Refresh data after adding staff
        } catch (error) {
            message.error(`Failed to add staff: ${error}`);
        }
    };

    const columns: Column[] = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "User Name",
            dataIndex: "user_name",
            key: "user_name",
        }, {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
        }, {
            title: "Email ",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Address ",
            dataIndex: "address",
            key: "address",
        },

        {
            title: "Role",
            dataIndex: "role_id",
            key: "role_id",
            render: (text) => text.name
        }, {
            title: "Email verified",
            dataIndex: "email_verified",
            key: "email_verified",
            render: (text) => (text ? "true" : "false"),

        }, {
            title: "Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (text) => (text ? "true" : "false"),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                Add Staff
            </Button>
            <Dashboard columns={columns} apiUri="account/staffs" action={false} refetch={refetch} setRefetch={setRefetch} />
            <Modal
                title="Add Staff"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddStaff}>
                    <Form.Item
                        name="full_name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input the full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="user_name"
                        label="User Name"
                        rules={[{ required: true, message: 'Please input the user name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Staff
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default StaffManagement;
