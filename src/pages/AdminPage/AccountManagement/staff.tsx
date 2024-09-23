import { Button, Form, Input } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import ButtonPrimary from "../../../components/Button";
import ImageComponent from "../../../components/Image";
import { formatDateHour } from "../../../utils/format";

const StaffManagement = () => {
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

    const formItem = (
        <>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Plesae input the brand name!" }]}>
                <Input placeholder="Brand Name"></Input>
            </Form.Item>
            <Form.Item name={"id"} hidden></Form.Item>
        </>
    )


    return (
        <>

            <Dashboard columns={columns} apiUri="staffs" action={true} formItem={formItem} />
        </>
    );
};

export default StaffManagement;
