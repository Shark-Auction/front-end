import { Button, Modal, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import { AuctionBiddingDetail } from "../../../../../../model/bidding";
import { formatDateHour, formatVND } from "../../../../../../utils/format";

interface BidHistoryProps {
  data: AuctionBiddingDetail[];
}

export const ModalHistory = ({ data }: BidHistoryProps) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const column: TableProps["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      className: "!text-base",
    },
    {
      title: "Người đấu giá",
      dataIndex: "customer",
      key: "name",
      render: (data) => data.full_name,
      className: "!text-base",
    },
    {
      title: "Thời gian đấu thầu",
      dataIndex: "bidTIme",
      key: "bidTIme",
      render: (data) => (
        <Tag className="!text-base" color="blue">
          {formatDateHour(data)}
        </Tag>
      ),
      className: "!text-base",
    },
    {
      title: "Lượng đấu thầu",
      dataIndex: "bidAmount",
      key: "bidAmount",
      render: (data) => formatVND(data),
      className: "!text-base text-orange-700",
    },
  ];
  return (
    <>
      <Button onClick={openModal} type="link" className="md:text-xl">
        Xem danh sách tham gia đấu giá
      </Button>
      <Modal
        width={700}
        open={open}
        onCancel={closeModal}
        title={<p className="md:text-xl">Lịch sử đấu thầu</p>}
        footer={[<Button onClick={closeModal}>Đóng</Button>]}
      >
        <Table columns={column} dataSource={data} />
      </Modal>
    </>
  );
};
