import { Button, Divider, InputNumber, Modal, Steps } from "antd";
import ButtonPrimary from "../../../../../../components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatVND } from "../../../../../../utils/format";
import { BiddingData } from "../../../../../../model/bidding";
import { auctionApi } from "../../../../../../service/api/auctionApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../core/store/store";
import { Link } from "react-router-dom";
import Underline from "../../../../../../components/UI/underline";
const { Step } = Steps;

interface ModalBiddingProps {
  currentPrice: number;
  step: number;
  auctionId: number;
}

export const ModalBidding = ({
  auctionId,
  currentPrice,
  step,
}: ModalBiddingProps) => {
  const [openBidding, setOpenBidding] = useState<boolean>(false);
  const userLoginned = useSelector((state: RootState) => state.user);
  const [amount, setAmount] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleBidAmount = (value: number | null) => {
    if (value !== null && value >= currentPrice + step) {
      setAmount(value);
    }
  };

  const increaseBidding = () => {
    setAmount(amount + step);
  };

  const decreaseBidding = () => {
    setAmount(amount - step);
  };

  const openBiddingModal = () => {
    setOpenBidding(true);
  };
  const closeBiddingModal = () => {
    setOpenBidding(false);
    setAmount(currentPrice + step);
    setCurrent(0);
  };

  const handleSubmitBidding = async () => {
    try {
      const dataBidding: BiddingData = {
        auctionId: auctionId,
        bidAmount: amount,
      };
      setLoading(true);
      await auctionApi.biddingAuction(dataBidding);
      await auctionApi.getAuctionById(auctionId);
      toast.success("Đấu thầu thành công");
      closeBiddingModal();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const preventNonNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /[^\d]/;
    if (regex.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setAmount(currentPrice + step);
  }, [currentPrice, step]);

  const steps = [
    {
      title: "Đấu thầu",
      content: (
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            <strong>Nhập lượng đấu thầu của bạn</strong>
          </p>
          <div className="flex">
            <Button
              disabled={amount === currentPrice + step}
              onClick={decreaseBidding}
              className="!rounded-se-none !rounded-ee-none text-xl"
            >
              -
            </Button>
            <InputNumber
              onKeyPress={preventNonNumericInput} // Prevent non-numeric input
              min={currentPrice + step} // Ensures the minimum bid is maintained
              className="w-full !rounded-none"
              value={amount}
              onChange={handleBidAmount}
              placeholder="Đang đấu thầu..."
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => parseInt(value?.replace(/\D/g, "") || "0", 10)}
            />
            <Button
              onClick={increaseBidding}
              className="!rounded-ss-none !rounded-es-none text-xl"
            >
              +
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            <strong>Xác nhận lượng đấu thầu của bạn</strong>
          </p>
          <p className="text-xl">
            <strong>Đấu thầu:</strong> {formatVND(amount)}
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <ButtonPrimary
        onClick={openBiddingModal}
        className="font-semibold text-2xl !w-full !py-5"
      >
        Đấu thầu
      </ButtonPrimary>
      {userLoginned ? (
        <Modal
          title="Đặt thầu"
          open={openBidding}
          onCancel={closeBiddingModal}
          footer={[
            current > 0 && (
              <Button key="back" onClick={prev}>
                Trở về
              </Button>
            ),
            current < steps.length - 1 ? (
              <Button key="next" type="primary" onClick={next}>
                Tiếp theo
              </Button>
            ) : (
              <Button onClick={handleSubmitBidding} key="submit" type="primary">
                Đấu
              </Button>
            ),
          ]}
          loading={loading}
        >
          <Steps current={current}>
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>
          <div className="steps-content mt-5">{steps[current].content}</div>
        </Modal>
      ) : (
        <Modal
          open={openBidding}
          onCancel={closeBiddingModal}
          title={<p className="text-xl !font-normal">Bạn chưa đăng nhập</p>}
          footer={false}
        >
          <p className="text-xl">
            {" "}
            <Link
              className="text-xl text-blue-500 relative group"
              to={"/auth/login"}
            >
              Đăng nhập ngay <Underline color="blue-500" />
            </Link>{" "}
            để tham gia phiên đấu giá.🔥
          </p>
          <Divider>hoặc</Divider>
          <p className="text-xl">
            {" "}
            <Link
              className="text-xl text-blue-500 relative group"
              to={"/auth/register"}
            >
              Đăng ký ngay <Underline color="blue-500" />
            </Link>{" "}
            nếu bạn chưa có tài khoản.✍️
          </p>
        </Modal>
      )}
    </>
  );
};
