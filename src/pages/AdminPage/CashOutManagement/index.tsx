import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import Dashboard, { Column } from "../../../components/Dashboard";
import { cashOutApi } from "../../../service/api/admin/cashoutApi";


const CashoutManagement = () => {

    const [refetch, setRefetch] = useState(false); // State để quản lý refetch

    const refreshData = () => {
        setRefetch(true); // Đặt refetch thành true khi cần fetch lại
    };


    const handleConfirm = async (id: number) => {
        try {

            await cashOutApi.confirmCashOut(id);
            toast.success("Confirm successfully");
            refreshData(); // Refresh data after deletion
        } catch (error: any) {
            toast.error("Error Confirm cashout: " + error.response?.data?.message);

        };
    }
    const columns: Column[] = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Full Name",
            dataIndex: "user",
            key: "user",
            render: (text) => text.full_name
        },
        {
            title: "User Name",
            dataIndex: "user",
            key: "user",
            render: (text) => text.user_name
        }, {
            title: "Money",
            dataIndex: "money",
            key: "money",
        }, {
            title: "Bank Account Name ",
            dataIndex: "bankAccountName",
            key: "bankAccountName",
        },
        {
            title: "Status ",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
            render: (_, record: any) => (
                <Popconfirm
                    title="Are you sure to confirm this cash out?"
                    onConfirm={() => handleConfirm(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary"
                        disabled={record.status === "Completed"} // Disable Popconfirm if status is 'completed'
                    >
                        Confirm
                    </Button>
                </Popconfirm>
            ),
        }

    ];
    return (
        <>
            <Dashboard columns={columns} apiUri="cashouts" action={false} refetch={refetch} setRefetch={setRefetch} />
        </>
    );
};

export default CashoutManagement;
