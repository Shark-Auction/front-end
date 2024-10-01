import { Tabs, TabsProps } from "antd";
import MyBuyTab from "./components/MyBuyTab";
import MySellTab from "./components/MySellTab";
import { useState } from "react";

export const OrderManagement = () => {
  const [activeKey, setActiveKey] = useState("1");
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đơn mua của tôi",
      children: <MyBuyTab activeKey={activeKey} />,
    },
    {
      key: "2",
      label: "Đơn bán của tôi",
      children: <MySellTab activeKey={activeKey} />,
    },
  ];
  return (
    <Tabs
      items={items}
      onChange={handleTabChange}
      centered
      defaultActiveKey="mybuy"
    />
  );
};
