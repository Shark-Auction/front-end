import { useEffect, useState } from "react";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";
import { Tag } from "antd";
import { formatVND } from "../../../../../../../utils/format";

interface MyPaymentProps {
  activeKey?: string;
}
const MyPayment = ({ activeKey }: MyPaymentProps) => {
  const [render, setRender] = useState(false);
  const columns: ColumnsTable[] = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "orderCode",
      key: "orderCode",
      title: "Mã đơn hàng",
      render: (record) => <Tag className="!text-base">{record}</Tag>,
    },
    {
      dataIndex: "paymentID",
      key: "paymentID",
      align: "center",
      title: "Mã giao dịch",
      render: (record) => (
        <Tag className="!text-base" color="geekblue-inverse">
          {record}
        </Tag>
      ),
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "Số tiền",
      render: (record) => (
        <p className="text-lg text-orange-500 font-semibold">
          {formatVND(record)}
        </p>
      ),
    },
    {
      dataIndex: "paymentUser",
      key: "paymentUser",
      title: "Người giao dịch",
      render: (record) => (
        <Tag className="!text-base" color="blue">
          {record.full_name}
        </Tag>
      ),
    },
    {
      dataIndex: "status",
      key: "orderEntity",
      title: "Trạng thái",
      render: (record) => (
        <>
          {record === "PAID" && <Tag color="green-inverse">Đã thanh toán</Tag>}
          {record === "PENDING" && (
            <Tag color="blue-inverse">Chưa thanh toán</Tag>
          )}
          {record === "CANCELLED" && (
            <Tag color="red-inverse">Thanh toán thất bại</Tag>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    if (activeKey === "5") {
      setRender(true);
    }
  }, [activeKey]);
  return (
    <TableComponent
      onRow={(record: any) => {
        return record.status === "PENDING"
          ? {
              onClick: () => window.open(record.checkoutUrl),
              style: {
                cursor: "pointer",
              },
              title: "Thanh toán lại",
            }
          : {};
      }}
      expandX={"inherit"}
      render={render}
      setRender={setRender}
      columns={columns}
      apiUri="payment/me"
    />
  );
};

export default MyPayment;
