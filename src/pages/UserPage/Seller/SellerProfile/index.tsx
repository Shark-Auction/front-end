import { useParams } from "react-router-dom";
import { SellerInformation } from "./components/SellerInformation";
import { useEffect, useState } from "react";
import { AuctionSellerModel, SellerInfor } from "../../../../model/seller";
import { toast } from "react-toastify";
import { sellerApi } from "../../../../service/api/sellerApi";
import LoadingComponent from "../../../../components/Loading";
import SellerAuction from "./components/SellerAuction";
import { Divider } from "antd";

const SellerProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [infor, setInfor] = useState<SellerInfor>();
  const [auction, setAuction] = useState<AuctionSellerModel[]>([]);
  const fetchSellerInfor = async () => {
    try {
      setLoading(true);
      const response = await sellerApi.getSellerProfile(Number(id));
      setInfor(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchSellerAuction = async () => {
    try {
      setLoading(true);
      const response = await sellerApi.getSellerProduct(Number(id));
      const filter = response.filter(
        (element: AuctionSellerModel) =>
          element.status === "InProgress" || element.status === "Waiting"
      );
      setAuction(filter);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSellerInfor();
    fetchSellerAuction();
  }, []);
  return (
    <div>
      {!loading ? (
        <>
          <SellerInformation data={infor} auction={auction} />
          <Divider />
          <SellerAuction dataProduct={auction} />
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default SellerProfile;
