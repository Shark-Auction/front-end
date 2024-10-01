import { Result } from "antd";

const PaymentSuccess = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </div>
  );
};

export default PaymentSuccess;
