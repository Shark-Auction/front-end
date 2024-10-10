import { useEffect, useState } from "react";
import ButtonPrimary from "../../../../../../../components/Button";
import ImageComponent from "../../../../../../../components/Image";
import ModalPayment from "../../../../../../../components/Modal/ModalPayment/ModalPayment";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";
import { Auction } from "../../../../../../../model/auction";
import { formatDateHour, formatVND } from "../../../../../../../utils/format";
import { getImageProduct } from "../../../../../../../utils/getImage";
import { Tag } from "antd";
import { statusAuction } from "../../../../../../../utils/render/statusRender";

interface MyWinningProps {
  activeKey: string;
}

const MyWinning = ({ activeKey }: MyWinningProps) => {
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Auction>();
  const handleOpen = (record: Auction) => {
    setOpen(true);
    setData(record);
  };
  const column: ColumnsTable[] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "product",
      key: "image",
      render: (data) => (
        <ImageComponent src={getImageProduct(data.thumbnail)} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "product",
      key: "name",
      render: (data) => data.name,
    },
    {
      title: "Xuất xứ",
      dataIndex: "product",
      key: "name",
      render: (data) => data.origin.name,
    },
    {
      title: "Danh mục",
      dataIndex: "product",
      key: "name",
      render: (data) => data.category.name,
    },
    {
      title: "Hãng",
      dataIndex: "product",
      key: "name",
      render: (data) => data.brand.name,
    },
    {
      title: "Giá",
      dataIndex: "product",
      key: "currentPrice",
      render: (_, record) => (
        <p className="font-bold text-base text-orange-600">
          {formatVND(record.currentPrice)}
        </p>
      ),
    },
    {
      title: "Người đăng",
      dataIndex: "product",
      key: "seller",
      render: (data) => data.seller.full_name,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (data) => formatDateHour(data),
    },
    {
      title: "Trạng thái đấu giá",
      dataIndex: "status",
      key: "statusProduct",
      render: (data) => statusAuction[data](),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <>
          {(record.status === "WaitingPay" ||
            record.status === "WaitingConfirm") && (
            <ButtonPrimary onClick={() => handleOpen(record)}>
              Thanh toán
            </ButtonPrimary>
          )}
          {(record.status === "Cancel" || record.status === "Fail") && (
            <Tag className="!text-base" color="red-inverse">
              Đã hết hạn thanh toán
            </Tag>
          )}
          {record.status === "Completed" && (
            <Tag className="!text-base" color="green-inverse">
              Đã thanh toán
            </Tag>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    if (activeKey === "4") {
      setRender(true);
    }
  }, [activeKey]);
  return (
    <>
      <p className="text-lg text-red-500 my-4 font-bold">
        (* Thời hạn thanh toán cho mỗi đơn hàng là 7 ngày kể từ khi phiên kết
        thúc *)
      </p>
      <TableComponent
        expandX={1700}
        render={render}
        setRender={setRender}
        columns={column}
        apiUri="auction/win"
      />
      {open && (
        <ModalPayment
          data={data as Auction}
          open={open}
          setOpen={setOpen}
          type="Auction"
        />
      )}
    </>
  );
};

export default MyWinning;
