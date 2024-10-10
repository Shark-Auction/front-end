import { useEffect, useState } from "react";
import { OrderInformation } from "../../../../../../model/order";
import { GetProps, Input, Select } from "antd";
import { orderApi } from "../../../../../../service/api/orderApi";
import { toast } from "react-toastify";
import CardOrder from "../../../../../../components/CardOrder";
import EmptyComponent from "../../../../../../components/Empty";
import ModalRating from "./components/ModalRating";
import LoadingComponent from "../../../../../../components/Loading";
import ModalDeliveryInformation from "./components/ModalDeliveryInformation";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
type SearchProps = GetProps<typeof Input.Search>;
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openDelivery, setOpenDelivery] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderInformation>();
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`${id}`);
  };
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
  const handleOpenDeliveryInformation = (record: OrderInformation) => {
    setOpenDelivery(true);
    setOrder(record)
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
    if (searchTerm !== "") {
      filtered = filtered.filter((element) =>
        element.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filtered);
    return () => {};
  }, [dataBuy, filterStatus, searchTerm]);
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      {!loading ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-lg">
            <Select
              options={optionFilter}
              value={filterStatus}
              onChange={handleChange}
              className="w-1/5"
            />
            <Search
              placeholder="Nhập từ khóa"
              onSearch={onSearch}
              enterButton
            />
          </div>
          {filteredData.length > 0 ? (
            filteredData.map((element: OrderInformation) => (
              <CardOrder
                onClickRating={() => handleOpenModalRating(element)}
                onClickConfirmed={() => handleReceived(element.id)}
                loadingAction={loadingAction}
                data={element}
                onClickDeliveredInformation={() => handleOpenDeliveryInformation(element)}
                onClickDetail={() => handleNavigate(element.id)}
                key={element.id}
              />
            ))
          ) : (
            <EmptyComponent />
          )}
          <ModalRating data={order} open={open} setOpen={setOpen} />
          <ModalDeliveryInformation
            open={openDelivery}
            setOpen={setOpenDelivery}
            type="buyer"
            data={order}
          />
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default MyBuyTab;
