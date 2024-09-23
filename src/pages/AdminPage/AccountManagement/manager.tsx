import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import { managerApi } from "../../../service/api/admin/accountAPI";
import { useRef, useState } from "react";


const ManagerManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const [refetch, setRefetch] = useState(false); // State để quản lý refetch
    const [form] = Form.useForm(); // Ant Design Form instance
    const refreshData = () => {
        setRefetch(true); // Đặt refetch thành true khi cần fetch lại
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
            <Dashboard columns={columns} apiUri="account/managers" action={false} refetch={refetch} setRefetch={setRefetch} />
        </>
    );
};

export default ManagerManagement;
