import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";
import { SellerAuction } from "./components/SellerAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Auction>();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAuctionById(id);
        setData(response.data);
      } catch (error: any) {
        toast.error(error.message);
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
            name={data.product.name}
            remainDay={data?.endTime}
            currentPrice={data.currentPrice}
            step={data.step}
            dateEnd={data?.endTime}
            numberOfBidding={data?.totalBids}
            key={data.id}
          />
          <SellerAuction seller={data.product.seller} />
          <AuctionInformation auctionData={data} />
        </div>
      ) : (
        <p>Not found</p>
      )}
    </Skeleton>
  );
};

export default AuctionDetail;
