import { Tabs, TabsProps } from "antd"
import MyProduct from "./components/MyProduct/MyProduct"
import MyAuction from "./components/MyAuction/MyAuction"

export const ProductManagement = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Sản phẩm',
      children: <MyProduct />
    },
    {
      key: '2',
      label: 'Đấu giá',
      children: <MyAuction />
    },
    {
      key: '3',
      label: 'My Bidding',
      children: 'My Bidding'
    },
    {
      key: '4',
      label: 'My Winning',
      children: 'My Winning'
    }
  ]
  return (
    <Tabs centered defaultActiveKey="1" items={items} />
  )
}
