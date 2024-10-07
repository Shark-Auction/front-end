import { useEffect, useState } from "react";
import ImageComponent from "../../../../../../../components/Image";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";
import { formatDateHour, formatVND } from "../../../../../../../utils/format";
import { getImageProduct } from "../../../../../../../utils/getImage";
import ButtonPrimary from "../../../../../../../components/Button";
import {
  PaymentRequest,
  PaymentResponse,
} from "../../../../../../../model/payment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/store/store";
import { toast } from "react-toastify";
import { paymentApi } from "../../../../../../../service/api/paymentApi";
import { Auction } from "../../../../../../../model/auction";
import { Skeleton } from "antd";

interface MyWinningProps {
  activeKey: string;
}

const MyWinning = ({ activeKey }: MyWinningProps) => {
  const [render, setRender] = useState(false);
  const userLoginned = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const handlePayment = async (data: Auction) => {
    const formItem: PaymentRequest = {
      orderId: data.product.id,
      userId: userLoginned ? userLoginned["userId"] : 0,
      senderTransaction: true,
    };
    try {
      setLoading(true);
      const response = await paymentApi.payment(formItem);
      const data: PaymentResponse = response.data;
      window.open(data.checkoutUrl);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
      title: 'Người đăng',
      dataIndex: 'product',
      key: 'seller',
      render: (data) => data.seller.full_name
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
        <ButtonPrimary onClick={() => handlePayment(record as Auction)}>
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
    <Skeleton loading={loading}>
      <TableComponent
        expandX={1700}
        render={render}
        setRender={setRender}
        columns={column}
        apiUri="auction/win"
      />
    </Skeleton>
  );
};

export default MyWinning;
