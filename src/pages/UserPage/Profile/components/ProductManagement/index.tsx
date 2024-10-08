import { Tabs, TabsProps } from "antd"
import MyProduct from "./components/MyProduct/MyProduct"
import MyAuction from "./components/MyAuction/MyAuction"
import { useState } from "react";
import MyWinning from "./components/MyWinning/MyWinning";
import MyPayment from "./components/MyPayment/MyPayment";

const ProductManagement = () => {
  const [activeKey, setActiveKey] = useState("1");
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Sản phẩm',
      children: <MyProduct activeKey={activeKey} />
    },
    {
      key: '2',
      label: 'Đấu giá',
      children: <MyAuction activeKey={activeKey} />
    },
    {
      key: '4',
      label: 'Đấu giá thắng',
      children: <MyWinning activeKey={activeKey} />
    },
    {
      key: '5',
      label: 'Giao dịch của tôi',
      children: <MyPayment activeKey={activeKey} />
    }
  ]
  return (
    <Tabs centered defaultActiveKey="1" items={items} activeKey={activeKey} onChange={handleTabChange} />
  )
}

export default ProductManagement
