import { Button, Modal, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { AuctionBiddingDetail } from "../../../../../../model/bidding";
import { formatDateHour, formatVND } from "../../../../../../utils/format";
import { auctionApi } from "../../../../../../service/api/auctionApi";
import { toast } from "react-toastify";

interface BidHistoryProps {
  id: number;
}

export const ModalHistory = ({ id }: BidHistoryProps) => {
  const [open, setOpen] = useState(false);
  const [biddingData, setBiddingData] = useState<AuctionBiddingDetail[]>([]);
  const [loading, setLoading] = useState(false);

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
      className: "md:!text-base",
    },
    {
      title: "Người đấu giá",
      dataIndex: "customer",
      key: "name",
      render: (data) => data.full_name,
      className: "md:!text-base",
    },
    {
      title: "Thời gian đấu thầu",
      dataIndex: "bidTIme",
      key: "bidTIme",
      render: (data) => (
        <Tag className="md:!text-base" color="blue">
          {formatDateHour(data)}
        </Tag>
      ),
      className: "md:!text-base",
    },
    {
      title: "Lượng đấu thầu",
      dataIndex: "bidAmount",
      key: "bidAmount",
      render: (data) => formatVND(data),
      className: "!md:text-base text-orange-700",
    },
  ];
  useEffect(() => {
    const fetchDetailBidding = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getBidding(String(id));
        setBiddingData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchDetailBidding();
    }
  }, [id, open]);
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
        <Table
          scroll={{ x: 500 }}
          columns={column}
          dataSource={biddingData}
          loading={loading}
        />
      </Modal>
    </>
  );
};
