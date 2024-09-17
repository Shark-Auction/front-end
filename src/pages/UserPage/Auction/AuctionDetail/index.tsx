import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";
import { SellerAuction } from "./components/SellerAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
import { AuctionBiddingDetail } from "../../../../model/bidding";
import { useWebSocket } from "../../../../hooks/useWebSocket";

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Auction | null>(null);
  const [biddingData, setBiddingData] = useState<AuctionBiddingDetail[]>([]);
  const { client } = useWebSocket();

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

    const fetchDetailBidding = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getBidding(id);
        setBiddingData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    client.connect(
      {},
      () => {
        client.subscribe(`/topic/auction/${id}`, async (message) => {
          const receivedMsg = JSON.parse(message.body);
          setData((prevData) => ({
            ...prevData,
            ...receivedMsg,
          }));
        });
      },
      (error: any) => {
        toast.error("WebSocket connection failed: " + error);
        console.error("WebSocket error: ", error);
      }
    );
    fetchDetailData();
    fetchDetailBidding();
  }, [id]);

  return (
    <Skeleton loading={loading}>
      {data ? (
        <div className="flex flex-col gap-10">
          <GeneralAuction
            user={data.product.seller}
            auctionId={Number(id)}
            name={data.product.name}
            remainDay={data.endTime}
            currentPrice={data.currentPrice}
            step={data.step}
            dateEnd={data.endTime}
            numberOfBidding={data.totalBids}
            key={data.id}
            image={data.product.product_images}
            biddingList={biddingData}
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
