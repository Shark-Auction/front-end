import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { ratingApi } from "../../../../../service/api/ratingApi";
interface ValueStyleProps {
  valuesStyle: any;
}

const RatingStatistics = ({valuesStyle}: ValueStyleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ratingApi.getAllRating();
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
      title="Feedback"
      value={data && data.length}
      prefix={<AiFillLike />}
      valueStyle={valuesStyle}
    />
  );
};

export default RatingStatistics;
