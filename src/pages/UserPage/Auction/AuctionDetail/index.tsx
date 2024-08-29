import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../config/axios/api";
import { useEffect, useState } from "react";
import { GeneralAuction } from "./components/GeneralAuction";

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
  const [data, setData] = useState<ProductProps>();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await api.get(`Product/${id}`);
        setData(response.data);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    };
    fetchDetailData();
  }, [id]);
  return data ? (
    <div className="flex flex-col">
      <GeneralAuction
        name={data.name}
        remainDay={data.remainDay}
        currentPrice={data.currentPrice}
        step={data.currentPrice}
        dateEnd={'14/09/2024'}
        numberOfBidding={14}
        key={data.id}
      />
    </div>
  ) : (
    <p>Not found</p>
  );
};

export default AuctionDetail;
