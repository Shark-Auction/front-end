import { Button, Form, Input, message, Modal, Popconfirm, Select } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { formatDateHour } from "../../../utils/format";
import { accountApi } from "../../../service/api/admin/accountAPI";
import { useRef, useState } from "react";

const { Option } = Select;
const AccountManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(0);
    const [newRoleId, setNewRoleId] = useState(null);

    const [refetch, setRefetch] = useState(false); // State để quản lý refetch
    const refreshData = () => {
        setRefetch(true); // Đặt refetch thành true khi cần fetch lại
    };

    const rolesMap = {
        1: "Admin",
        2: "Manager",
        3: "Staff",
        4: "User",
        // Add more role mappings as needed
    };

    const handleEdit = (id: number, currentRoleId: any) => {
        setSelectedAccountId(id);
        setNewRoleId(currentRoleId); // Set the current role ID
        setIsModalVisible(true);
    };
    const handleRoleChange = async () => {
        if (selectedAccountId && newRoleId) {
            try {
                await accountApi.setRoleAccount(selectedAccountId, { roleId: newRoleId });
                message.success("Role updated successfully");
                setIsModalVisible(false);
                refreshData();
            } catch (error) {
                message.error(`Failed to update role: ${error}`);
            }
        }
    };
    const handleBan = async (id: number) => {
        try {
            await accountApi.banAccount(id);
            message.success("Account banned successfully");
            // Optionally, trigger a reload of the data after banning
            refreshData();  // Gọi refreshData để set refetch
        } catch (error) {
            message.error(`Failed to ban account: ${error}`);
        }
    };
    const handleUnBan = async (id: number) => {
        try {
            await accountApi.unBanAccount(id);
            message.success("Account unBanned successfully");
            // Optionally, trigger a reload of the data after banning
            refreshData();  // Gọi refreshData để set refetch
        } catch (error) {
            message.error(`Failed to unBan account: ${error}`);
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
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
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
            render: (text) => text.name,
        },
        {
            title: "Email verified",
            dataIndex: "email_verified",
            key: "email_verified",
            render: (text) => (text ? "true" : "false"),
        },
        {
            title: "Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (text) => (text ? "true" : "false"),
        },
        {
            title: "Action",
            dataIndex: "is_active",
            key: "action",
            render: (_, record) => (
                <>
                    {record.is_active ? (
                        <Popconfirm
                            title="Are you sure you want to ban this user?"
                            onConfirm={() => handleBan(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Ban</Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="Are you sure you want to unban this user?"
                            onConfirm={() => handleUnBan(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary">Unban</Button>
                        </Popconfirm>
                    )}
                    <Button onClick={() => handleEdit(record.id, record.role_id.name)} style={{ marginLeft: 8 }}>
                        Edit
                    </Button>
                </>
            ),
        },
    ];


    return (
        <>

            <Dashboard columns={columns} apiUri="account" action={false} refetch={refetch} setRefetch={setRefetch} />
            <Modal
                title="Edit Role"
                visible={isModalVisible}
                onOk={handleRoleChange}
                onCancel={() => {
                    setIsModalVisible(false)
                    setNewRoleId(null)
                }}
            >
                <Select
                    value={newRoleId}
                    onChange={setNewRoleId}
                    style={{ width: "100%" }}
                >
                    {Object.entries(rolesMap).map(([id, name]) => (
                        <Option key={id} value={id}>
                            {name}
                        </Option>
                    ))}
                </Select>
            </Modal>
        </>
    );
};

export default AccountManagement;
