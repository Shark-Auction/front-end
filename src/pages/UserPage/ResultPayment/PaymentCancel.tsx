import { Divider, Result } from "antd";
import ButtonPrimary from "../../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderCode = searchParams.get("orderCode");
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Result
        status="error"
        title="Thanh toán thất bại!"
        subTitle={
          <div>
            <p className="text-xl text-red-500 font-semibold">
              Lỗi xảy ra với giao dịch
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

export default PaymentCancel;
