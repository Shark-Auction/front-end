import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../config/axios/api";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";
import { SellerAuction } from "./components/SellerAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { Skeleton } from "antd";

interface ProductProps {
  id: string;
  remainDay: string;
  name: string;
  currentPrice: string;
  status: string;
  image: string;
}

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductProps>();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`Product/${id}`);
        setData(response.data);
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailData();
  }, [id]);
  return (
    <Skeleton loading={loading}>
      {data ? (
        <div className="flex flex-col gap-10">
          <GeneralAuction
            name={data.name}
            remainDay={data.remainDay}
            currentPrice={data.currentPrice}
            step={data.currentPrice}
            dateEnd={"14/09/2024"}
            numberOfBidding={14}
            key={data.id}
          />
          <SellerAuction />
          <AuctionInformation />
        </div>
      ) : (
        <p>Not found</p>
      )}
    </Skeleton>
  );
};

export default AuctionDetail;
