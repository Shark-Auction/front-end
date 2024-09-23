import { Tabs, TabsProps } from "antd";
import MyBuyTab from "./components/MyBuyTab";
import MySellTab from "./components/MySellTab";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "mybuy",
    label: "Đơn mua của tôi",
    children: <MyBuyTab />,
  },
  {
    key: "mysell",
    label: 'Đơn bán của tôi',
    children: <MySellTab />
  }
];

export const OrderManagement = () => {
  return (
    <Tabs items={items} onChange={onChange} centered defaultActiveKey="mybuy" />
  );
};
