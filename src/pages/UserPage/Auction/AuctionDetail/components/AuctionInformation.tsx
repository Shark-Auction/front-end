import { Descriptions, DescriptionsProps, Divider } from "antd";

export const AuctionInformation = () => {
  const itemsProductInformation: DescriptionsProps["items"] = [
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Category</p>,
      children: <p className="text-xl text-black">Category</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Brand</p>,
      children: <p className="text-xl text-black">Brand</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Weight</p>,
      children: <p className="text-xl text-black">Brand</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Condition</p>,
      children: <p className="text-xl text-black">Condition</p>,
    },
  ];
  const itemAuctionDetail: DescriptionsProps["items"] = [
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Category</p>,
      children: <p className="text-xl text-black">Category</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Brand</p>,
      children: <p className="text-xl text-black">Brand</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Weight</p>,
      children: <p className="text-xl text-black">Brand</p>,
    },
    {
      key: "category",
      label: <p className="text-xl text-gray-500">Condition</p>,
      children: <p className="text-xl text-black">Condition</p>,
    },
  ];
  return (
    <div className="w-full shadow-shadowLight border p-5 flex flex-col gap-10">
      <div>
        <p className="text-2xl">
          <strong>Product Information</strong>
        </p>
        <Divider className="border-gray-300" />
        <Descriptions column={1} items={itemsProductInformation} />
      </div>
      <div>
        <p className="text-2xl">
          <strong>Auction Detail</strong>
        </p>
        <Divider className="border-gray-300" />
        <Descriptions column={1} items={itemAuctionDetail} />
      </div>
      <div>
        <p className="text-2xl">
          <strong>Description</strong>
        </p>
        <Divider className="border-gray-300" />
      </div>
    </div>
  );
};
