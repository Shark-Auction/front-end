import { useEffect, useState } from "react";
import { OrderInformation } from "../../../../../../model/order";
import { Select } from "antd";
import { orderApi } from "../../../../../../service/api/orderApi";
import { toast } from "react-toastify";
import CardOrder from "../../../../../../components/CardOrder";
import EmptyComponent from "../../../../../../components/Empty";
import ModalRating from "./components/ModalRating";
import LoadingComponent from "../../../../../../components/Loading";
const optionFilter = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "processing",
    label: "Đang chờ giao hàng",
  },
  {
    value: "shipping",
    label: "Đang giao hàng",
  },
  {
    value: "delivered",
    label: "Đã giao hàng",
  },
  {
    value: "received",
    label: "Đã nhận hàng",
  },
];
interface MyBuyTabProps {
  activeKey: string;
}
const MyBuyTab = ({ activeKey }: MyBuyTabProps) => {
  const [dataBuy, setDataBuy] = useState<OrderInformation[]>([]);
  const [filteredData, setFilteredData] = useState<OrderInformation[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderInformation>();
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getMyBuyOrder();
      const filter = response.data.sort(
        (a: OrderInformation, b: OrderInformation) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setDataBuy(filter);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (values: string) => {
    setFilterStatus(values);
  };
  const handleOpenModalRating = (record: OrderInformation) => {
    setOpen(true);
    setOrder(record);
  };
  const handleReceived = async (id: number) => {
    try {
      setLoadingAction(true);
      await orderApi.receivedOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
      await fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };
  useEffect(() => {
    fetchData();
    if (activeKey === "1") {
      fetchData();
    }
  }, [activeKey]);
  useEffect(() => {
    let filtered = dataBuy;
    if (filterStatus === "") {
      filtered = dataBuy;
    } else {
      filtered = filtered.filter((element) => element.status === filterStatus);
    }
    setFilteredData(filtered);
    return () => {};
  }, [dataBuy, filterStatus]);
  return (
    <>
      {!loading ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-lg">
            <p className="w-fit">Lọc sản phẩm: </p>
            <Select
              options={optionFilter}
              value={filterStatus}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
          {filteredData.length > 0 ? (
            filteredData.map((element: OrderInformation) => (
              <CardOrder
                onClickRating={() => handleOpenModalRating(element)}
                onClickConfirmed={() => handleReceived(element.id)}
                loadingAction={loadingAction}
                data={element}
              />
            ))
          ) : (
            <EmptyComponent />
          )}
          <ModalRating data={order} open={open} setOpen={setOpen} />
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default MyBuyTab;
