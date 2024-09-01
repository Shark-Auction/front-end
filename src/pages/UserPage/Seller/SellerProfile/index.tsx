import { useParams } from "react-router-dom";
import { SellerInformation } from "./components/SellerInformation";

const SellerProfile = () => {
  const { id } = useParams();
  console.log(id ?? 'null')
  return (
    <div>
      <SellerInformation
        sellerName="LÊ ĐẶNG HỮU NAM NÈ NÈ NÈ"
        follower={100}
        reputation={100}
        product={100}
        participateIn="14/09/2003"
        rating={5}
      />
    </div>
  );
};

export default SellerProfile
