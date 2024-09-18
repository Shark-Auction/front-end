import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";
import { SellerAuction } from "./components/SellerAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
import { useWebSocket } from "../../../../hooks/useWebSocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/store/store";

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Auction | null>(null);
  const { client } = useWebSocket();
  const userLoginned = useSelector((state: RootState) => state.user);

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
  }, [id]);


  console.log(userLoginned)

  return (
    <Skeleton loading={loading}>
      {data ? (
        <div className="flex flex-col gap-10">
          <GeneralAuction
            data={data}
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
