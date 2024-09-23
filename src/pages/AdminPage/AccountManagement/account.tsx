import { Button, Form, Input, message, Popconfirm } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { formatDateHour } from "../../../utils/format";
import { accountApi } from "../../../service/api/admin/accountAPI";

const AccountManagement = () => {
    const handleBan = async (id: number) => {
        try {
            await accountApi.banAccount(id);
            message.success("Account banned successfully");
            // Optionally, trigger a reload of the data after banning
        } catch (error) {
            message.error(`Failed to ban account: ${error}`);
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
        {
            title: "Action",
            dataIndex: "is_active",
            key: "action",
            render: (_, record) => (
                record.is_active ? (
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
                        onConfirm={() => handleBan(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary">Unban</Button>
                    </Popconfirm>
                )
            ),
        },

    ];

    // const formItem = (
    //     <>

    //         <Form.Item
    //             label="Name"
    //             name="name"
    //             rules={[{ required: true, message: "Plesae input the brand name!" }]}>
    //             <Input placeholder="Brand Name"></Input>
    //         </Form.Item>
    //         <Form.Item name={"id"} hidden></Form.Item>
    //     </>
    // )


    return (
        <>

            <Dashboard columns={columns} apiUri="account" action={false} />
        </>
    );
};

export default AccountManagement;
