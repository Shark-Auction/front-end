import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";
import { AuctionInformation } from "./components/AuctionInformation";
import { Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
import { useWebSocket } from "../../../../hooks/useWebSocket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/store/store";
import ImageSlide from "./components/ImageSlide/ImageSlide";
import ActionAuction from "./components/ActionAuction";

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

  console.log(userLoginned);

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
