import { Button, InputNumber, Modal, Steps } from "antd";
import ButtonPrimary from "../../../../../../components/Button";
import { useEffect, useState } from "react";
const { Step } = Steps;

interface ModalBiddingProps {
  currentPrice: number;
  step: number;
}

export const ModalBidding = ({ currentPrice, step }: ModalBiddingProps) => {
  const [openBidding, setOpenBidding] = useState(false);
  const [amount, setAmount] = useState(0);
  const [current, setCurrent] = useState(0);
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
    setAmount(currentPrice + step)
  };

  useEffect(() => {
    setAmount(currentPrice + step);
  }, []);

  const steps = [
    {
      title: "Bidding",
      content: (
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            <strong>Enter your bidding</strong>
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
              placeholder="Bidding..."
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
          <p className="text-xl">
            <strong>Your wallet:</strong> 1000000 VND
          </p>
        </div>
      ),
    },
    {
      title: "Confirm",
      content: (
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            <strong>Confirm your bid</strong>
          </p>
          <p className="text-xl">
            <strong>Bid amount:</strong> {amount} VND
          </p>
          <p className="text-xl">
            <strong>Your wallet:</strong> 1000000 VND
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
        BIDDING NOW
      </ButtonPrimary>
      <Modal
        title="Place bid"
        open={openBidding}
        onCancel={closeBiddingModal}
        footer={[
          current > 0 && (
            <Button key="back" onClick={prev}>
              Previous
            </Button>
          ),
          current < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button key="submit" type="primary">
              Submit
            </Button>
          ),
        ]}
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
