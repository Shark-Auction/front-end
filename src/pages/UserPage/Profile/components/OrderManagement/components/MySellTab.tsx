import { useEffect, useState } from "react";
import { OrderInformation } from "../../../../../../model/order";
import { Select } from "antd";
import { orderApi } from "../../../../../../service/api/orderApi";
import { toast } from "react-toastify";
import CardOrder from "../../../../../../components/CardOrder";
import EmptyComponent from "../../../../../../components/Empty";
import LoadingComponent from "../../../../../../components/Loading";
import ModalDeliveryInformation from "./components/ModalDeliveryInformation";
import { useNavigate } from "react-router-dom";
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
interface MySellTabProps {
  activeKey: string;
}
const MySellTab = ({ activeKey }: MySellTabProps) => {
  const [dataBuy, setDataBuy] = useState<OrderInformation[]>([]);
  const [filteredData, setFilteredData] = useState<OrderInformation[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const [openDelivery, setOpenDelivery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderInformation>();
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`${id}`);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getMySellOrder();
      setDataBuy(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (values: string) => {
    setFilterStatus(values);
  };
  const handleDelivered = async (id: number) => {
    try {
      setLoadingAction(true);
      await orderApi.deliveredOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
      await fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleSend = async (id: number) => {
    try {
      setLoadingAction(true);
      await orderApi.sendOrder(id);
      toast.success(`Cập nhật đơn hàng ${id} thành công`);
      await fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleOpenDeliveryInformation = (record: OrderInformation) => {
    setOpenDelivery(true);
    setOrder(record);
  };
  useEffect(() => {
    fetchData();
    if (activeKey === "2") {
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
                data={element}
                loadingAction={loadingAction}
                onClickDelivered={() => handleDelivered(element.id)}
                onClickDetail={() => handleNavigate(element.id)}
                onClickSent={() => handleSend(element.id)}
                onClickDeliveredInformation={() =>
                  handleOpenDeliveryInformation(element)
                }
              />
            ))
          ) : (
            <EmptyComponent />
          )}
          <ModalDeliveryInformation
            open={openDelivery}
            setOpen={setOpenDelivery}
            type="seller"
            data={order}
          />
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default MySellTab;
