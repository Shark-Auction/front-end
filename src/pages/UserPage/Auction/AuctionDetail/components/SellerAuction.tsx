import { Avatar, Descriptions, DescriptionsProps, Divider } from "antd";
import ButtonPrimary from "../../../../../components/Button";

export const SellerAuction = () => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: (
        <p className="text-xl text-black">
          <strong>Rating</strong>
        </p>
      ),
      children: <p className="text-primaryColor text-xl">5/5</p>,
    },
    {
      key: "2",
      label: (
        <p className="text-xl text-black">
          <strong>Reputation</strong>
        </p>
      ),
      children: <p className="text-primaryColor text-xl">100%</p>,
    },
  ];
  return (
    <div className="w-full shadow-shadowLight border px-2 py-4">
      <div className="flex gap-5 items-center">
        <Avatar className="w-16 h-16" />
        <div className="flex flex-col gap-2">
          <p className="text-xl">
            <strong>Username</strong>
          </p>
          <ButtonPrimary className="!border-2 !border-primaryColor !bg-blue-300 !text-blue-700 text-lg">
            View seller
          </ButtonPrimary>
        </div>
      </div>
      <Divider className="border-gray-300" />
      <Descriptions items={items} />
    </div>
  );
};
