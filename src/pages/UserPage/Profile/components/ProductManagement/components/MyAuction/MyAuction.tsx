import { useEffect, useState } from "react";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";
import ImageComponent from "../../../../../../../components/Image";
import { formatDateHour, formatVND } from "../../../../../../../utils/format";
import { Tag } from "antd";
import { statusAuction } from "../../../../../../../utils/render/statusRender";
import ModalDetail from "./components/ModalDetail";
import { MyAuctionProfile } from "../../../../../../../model/profile";

const MyAuction = ({ activeKey }: { activeKey: string }) => {
  const [selectedRow, setSelectedRow] = useState<MyAuctionProfile>();
  const [isOpen, setIsOpen] = useState(false);
  const [render, setRender] = useState(false);
  const columns: ColumnsTable[] = [
    {
      title: "#",
      key: "id",
      dataIndex: "id",
      fixed: "left",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh sản phẩm",
      key: "product",
      dataIndex: "product",
      render: (data) => <ImageComponent src={data?.imageThumbnail} />,
    },
    {
      title: "Tên sản phẩm",
      key: "product",
      dataIndex: "product",
      render: (data) => data?.name,
    },
    {
      title: "Ngày bắt đầu",
      key: "startTime",
      dataIndex: "startTime",
      render: (data) => <Tag color="blue">{formatDateHour(data)}</Tag>,
    },
    {
      title: "Ngày kết thúc",
      key: "endTime",
      dataIndex: "endTime",
      render: (data) => <Tag color="cyan-inverse">{formatDateHour(data)}</Tag>,
    },
    {
      title: "Bước nhảy",
      key: "step",
      dataIndex: "step",
      render: (data) => (
        <p className="font-bold text-base text-orange-600">{formatVND(data)}</p>
      ),
    },
    {
      title: "Tổng đấu giá",
      key: "totalBid",
      dataIndex: "totalBids",
      render: (data) => <Tag color="geekblue">{data}</Tag>,
    },
    {
      title: "Giá hiện tại",
      key: "currentPrice",
      dataIndex: "currentPrice",
      render: (data) => (
        <p className="font-bold text-base text-orange-600">{formatVND(data)}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (data) => statusAuction[data](),
    },
  ];
  const handleRowClick = (record: any) => {
    setSelectedRow(record);
    setIsOpen(true);
  };
  useEffect(() => {
    if (activeKey === "2") {
      setRender(true);
    }
  }, [activeKey]);
  return (
    <>
      <TableComponent
        typeTable="auction"
        apiUri="auction/myauction"
        expandX={1500}
        columns={columns}
        onRow={(record: MyAuctionProfile) => {
          return {
            onClick: () => handleRowClick(record),
            style: {
              cursor: "pointer",
            },
          };
        }}
        render={render}
        setRender={setRender}
      />
      <ModalDetail
        open={isOpen}
        setOpen={setIsOpen}
        data={selectedRow}
        setRender={setRender}
      />
    </>
  );
};

export default MyAuction;
