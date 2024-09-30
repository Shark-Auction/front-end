import { Result } from "antd";

const PaymentCancel = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Result
        status="error"
        title="Thanh toán thất bại!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </div>
  );
};

export default PaymentCancel;
