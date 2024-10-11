import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { auctionApi } from "../../../../../service/api/auctionApi";

interface ValueStyleProps {
  valuesStyle: any;
}

const AuctionStatistics = ({valuesStyle}: ValueStyleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAuction();
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
      title="Auction"
      value={data && data.length}
      prefix={<RiAuctionFill />}
      valueStyle={valuesStyle}
    />
  );
};

export default AuctionStatistics;
