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
      title: "Giá chót",
      dataIndex: "product",
      key: "finalPrice",
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
      title: "Thanh toán",
      dataIndex: "id",
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <ButtonPrimary onClick={() => handleOpen(record)}>
          Thanh toán
        </ButtonPrimary>
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
      <TableComponent
        expandX={1700}
        render={render}
        setRender={setRender}
        columns={column}
        apiUri="auction/win"
      />
      {open && (
        <ModalPayment data={data as Auction} open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default MyWinning;
