import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deliveryApi } from "../../../../../service/api/deliveryApi";
import { MdDeliveryDining } from "react-icons/md";
interface ValueStyleProps {
  valuesStyle: any;
}

const DeliveryStatistics = ({ valuesStyle }: ValueStyleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await deliveryApi.getAllDelivery();
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
      title="Delivery"
      value={data && data.length}
      prefix={<MdDeliveryDining />}
      valueStyle={valuesStyle}
    />
  );
};

export default DeliveryStatistics;
