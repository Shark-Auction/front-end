import { Button, InputNumber, Modal, Steps } from "antd";
import ButtonPrimary from "../../../../../../components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatVND } from "../../../../../../utils/format";
import { BiddingData } from "../../../../../../model/bidding";
import { auctionApi } from "../../../../../../service/api/auctionApi";
const { Step } = Steps;

interface ModalBiddingProps {
  currentPrice: number;
  step: number;
  auctionId: number;
}

export const ModalBidding = ({auctionId, currentPrice, step }: ModalBiddingProps) => {
  const [openBidding, setOpenBidding] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleBidAmount = (e: any) => {
    setAmount(e.target.value);
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
    setCurrent(0)
  };

  const handleSubmitBidding = async () => {
    try {
      const dataBidding: BiddingData = {
        auctionId: auctionId,
        bidAmount: amount
      }
      setLoading(true)
      await auctionApi.biddingAuction(dataBidding);
      await auctionApi.getAuctionById(auctionId)
      toast.success('Đấu thầu thành công')
      closeBiddingModal()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

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
              controls={false}
              className="w-full !rounded-none"
              value={amount}
              onChange={handleBidAmount}
              placeholder="Đang đấu thầu..."
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
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
        className="font-semibold text-xl !w-full !py-5"
      >
        Đấu thầu
      </ButtonPrimary>
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
    </>
  );
};
