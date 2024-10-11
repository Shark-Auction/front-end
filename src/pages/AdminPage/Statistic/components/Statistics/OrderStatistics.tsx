import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { orderApi } from "../../../../../service/api/orderApi";
interface ValueStyleProps {
  valuesStyle: any;
}

const OrderStatistics = ({ valuesStyle }: ValueStyleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getAllOrder();
        setData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Statistic
      loading={loading}
      title="Order"
      value={data && data.length}
      prefix={<FaShoppingCart />}
      valueStyle={valuesStyle}
    />
  );
};

export default OrderStatistics;
