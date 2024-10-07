import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageSlide from "../../../../components/ImageSlide/ImageSlide";
import { useWebSocket } from "../../../../hooks/useWebSocket";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
import ActionAuction from "./components/ActionAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { GeneralAuction } from "./components/GeneralAuction";

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Auction | null>(null);
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
      }
    );
    fetchDetailData();
  }, [id]);

  return (
    <Skeleton loading={loading}>
      {data ? (
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="w-full lg:w-1/4 h-full bg-white p-5 rounded-lg lg:shadow-shadowHeavy lg:sticky lg:top-[100px]">
            <ImageSlide image={data.product.product_images} />
          </div>
          <div className="flex w-full lg:w-2/4 flex-col gap-5">
            <GeneralAuction data={data} />
            <div className="block lg:hidden w-full lg:w-1/4">
              <ActionAuction data={data} />
            </div>
            <AuctionInformation auctionData={data} />
          </div>
          <div className="hidden lg:block w-full lg:w-1/4">
            <ActionAuction data={data} />
          </div>
        </div>
      ) : (
        <p>Not found</p>
      )}
    </Skeleton>
  );
};

export default AuctionDetail;
