import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { SiProducthunt } from "react-icons/si";
import { toast } from "react-toastify";
import { productApi } from "../../../../../service/api/productApi";
interface ValueStyleProps {
  valuesStyle: any;
}

const ProductStatistics = ({valuesStyle}: ValueStyleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await productApi.getAllProduct();
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
      title="Product"
      value={data && data.length}
      prefix={<SiProducthunt />}
      valueStyle={valuesStyle}
    />
  );
};

export default ProductStatistics;
