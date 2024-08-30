import { TbHammer } from "react-icons/tb";
import ImageSlide from "./ImageSlide/ImageSlide";
import { LuClock3 } from "react-icons/lu";
import { ModalBidding } from "./Modal/ModalBidding";
import { ModalHistory } from "./Modal/ModalHistory";

interface GeneralAuctionProps {
  name: string;
  currentPrice: string;
  step: string;
  numberOfBidding: number;
  remainDay: string;
  dateEnd: string;
}

const textCss = "md:text-xl";

export const GeneralAuction = ({
  name,
  currentPrice,
  step,
  numberOfBidding,
  remainDay,
  dateEnd,
}: GeneralAuctionProps) => {
  const image = [
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s",
    "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
  ];
  return (
    <div className="w-full border shadow-shadowLight flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-2/4 h-[600px]">
        <ImageSlide image={image} />
      </div>
      <div className="py-5 px-3 flex flex-col gap-5 w-full">
        <p className="text-2xl">
          <strong>{name}</strong>
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-10 w-fit">
          <p className={`${textCss} text-gray-500`}>The current:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>
            {currentPrice} VND
          </p>
          <p className={`${textCss} text-gray-500`}>Step:</p>
          <p className={`${textCss} text-red-500 font-semibold`}>{step} VND</p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="flex items-center gap-4">
            <TbHammer className="text-3xl" />
            <p className="md:text-xl font-semibold">{numberOfBidding}</p>
          </div>
          <div className="flex items-center gap-4">
            <LuClock3 className="text-3xl" />
            <p className="md:text-xl font-semibold">{remainDay}</p>
          </div>
          <div className="border bg-gray-300 rounded-lg px-5">
            <p className="md:text-lg font-semibold">Session end at {dateEnd}</p>
          </div>
        </div>
        <div className="flex w-full justify-center mt-5">
          <ModalBidding step={500000} currentPrice={1000000} />
        </div>
        <ModalHistory />
      </div>
    </div>
  );
};
