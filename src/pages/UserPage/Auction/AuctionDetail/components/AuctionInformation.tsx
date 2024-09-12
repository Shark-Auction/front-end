import { Descriptions, DescriptionsProps, Divider, Tag } from "antd";
import { Auction } from "../../../../../model/auction";
import { condition } from "../../../../../utils/render/statusRender";
import { formatDateHour, formatVND } from "../../../../../utils/format";

interface AuctionInformationProps {
  auctionData: Auction;
}

export const AuctionInformation = ({
  auctionData,
}: AuctionInformationProps) => {
  const itemsProductInformation: DescriptionsProps["items"] = [
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Danh mục</p>,
      children: (
        <p className="md:text-xl text-black">
          {auctionData.product.category.name}
        </p>
      ),
    },
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Hãng</p>,
      children: (
        <p className="md:text-xl text-black">
          {auctionData.product.brand.name}
        </p>
      ),
    },
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Xuất xứ</p>,
      children: (
        <p className="md:text-xl text-black">
          {auctionData.product.origin.name}
        </p>
      ),
    },
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Điều kiện</p>,
      children: (
        <p className="md:text-xl text-black">
          {condition[auctionData.product.condition]()}
        </p>
      ),
    },
  ];
  const itemAuctionDetail: DescriptionsProps["items"] = [
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Giá khởi điểm</p>,
      children: (
        <p className="md:text-xl text-orange-600">
          {formatVND(auctionData.product.startingPrice)}
        </p>
      ),
    },
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Thời gian bắt đầu</p>,
      children: (
        <Tag color="geekblue" className="md:text-base">
          {formatDateHour(auctionData.startTime)}
        </Tag>
      ),
    },
    {
      key: "category",
      label: <p className="md:text-xl text-gray-500">Thời gian kết thúc</p>,
      children: (
        <Tag color="geekblue-inverse" className="md:text-base ">
          {formatDateHour(auctionData.endTime)}
        </Tag>
      ),
    },
  ];
  return (
    <div className="w-full shadow-shadowLight border p-5 flex flex-col gap-10">
      <div>
        <p className="text-2xl">
          <strong>Thông tin sản phẩm</strong>
        </p>
        <Divider className="border-gray-300" />
        <Descriptions column={1} items={itemsProductInformation} />
      </div>
      <div>
        <p className="text-2xl">
          <strong>Chi tiết đấu giá</strong>
        </p>
        <Divider className="border-gray-300" />
        <Descriptions column={1} items={itemAuctionDetail} />
      </div>
      <div>
        <p className="text-2xl">
          <strong>Mô tả sản phẩm</strong>
        </p>
        <Divider className="border-gray-300" />
        <div
          dangerouslySetInnerHTML={{ __html: auctionData.product.description }}
        />
      </div>
    </div>
  );
};
