import { Divider, Result } from "antd";
import ButtonPrimary from "../../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderCode = searchParams.get("orderCode");
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle={
          <div>
            <p className="text-xl text-green-500 font-semibold">
              Cảm ơn đã sử dụng Shark Auction
            </p>
            <Divider />
            <div className="flex flex-col gap-2">
              <p className="text-xl">Mã giao dịch: {id && id}</p>
              <p className="text-xl">Mã đơn hàng: {orderCode && orderCode}</p>
            </div>
          </div>
        }
        extra={[
          <ButtonPrimary onClick={() => navigate("/u/home")}>
            Quay trở lại trang chủ
          </ButtonPrimary>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
