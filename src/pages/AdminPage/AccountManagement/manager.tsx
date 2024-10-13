import { useState } from "react";
import Dashboard, { Column } from "../../../components/Dashboard";


const ManagerManagement = () => {
    const [refetch, setRefetch] = useState(false);
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
            <Dashboard columns={columns} apiUri="account/managers" action={false} refetch={refetch} setRefetch={setRefetch} />
        </>
    );
};

export default ManagerManagement;
