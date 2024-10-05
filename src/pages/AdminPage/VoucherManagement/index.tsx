import { Button, Form, Input, Select, DatePicker } from "antd";
import Dashboard, { Column } from "../../../components/Dashboard";
import { formatDateHour } from "../../../utils/format";

import { useEffect, useState } from "react";
import { accountApi } from "../../../service/api/admin/accountAPI";
import dayjs from "dayjs";

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

const VoucherManagement = () => {
    const [users, setUsers] = useState<User[]>([]); // State to store users
    const formatDateHourVoucher = (date: string) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm');
    };
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
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Voucher Code",
            dataIndex: "voucherCode",
            key: "voucherCode",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (text) => formatDateHour(text), // Format startTime
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (text) => formatDateHour(text), // Format startTime
        },
    ];

    const formItem = (
        <>
            <Form.Item
                label="Voucher Code"
                name="voucherCode"
                rules={[{ required: true, message: "Please input the Voucher Code!" }]}
            >
                <Input placeholder="Voucher Code" />
            </Form.Item>

            <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: "Please input the Discount!" }]}
            >
                <Input placeholder="Discount" />
            </Form.Item>
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
                label="Start Time"
                name="startTime"
                rules={[{ required: true, message: "Please select the start time!" }]}
            >     <Input />
                {/* <DatePicker
                    showTime

                    placeholder="Select Start Time"
                /> */}
            </Form.Item>

            <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Please select the end time!" }]}
            >
                <Input />
                {/* <DatePicker
                    showTime

                    placeholder="Select End Time"
                /> */}
            </Form.Item>
            {/* <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select the status!" }]}
            >
                <Select placeholder="Select status">
                    <Select.Option value="PENDING">PENDING</Select.Option>
                    <Select.Option value="RESOLVED">RESOLVED</Select.Option>
                    <Select.Option value="PENALIZED">PENALIZED</Select.Option>
                </Select>
            </Form.Item> */}

            <Form.Item name={"id"} hidden></Form.Item>
        </>
    );
    // const handleSubmit = (values: any) => {
    //     // Format startTime and endTime before sending
    //     const formattedValues = {
    //         ...values,
    //         startTime: formatDateHourVoucher(values.startTime),
    //         endTime: formatDateHourVoucher(values.endTime),
    //     };
    //     console.log("Formatted form values: ", formattedValues);
    //     // Gửi dữ liệu đã format
    // };
    return (
        <>
            <Dashboard columns={columns} apiUri="voucher" formItem={formItem} action={true} />
        </>
    );
};

export default VoucherManagement;
