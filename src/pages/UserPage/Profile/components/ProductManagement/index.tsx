import { Tabs, TabsProps } from "antd"
import MyProduct from "./components/MyProduct/MyProduct"

export const ProductManagement = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My Product',
      children: <MyProduct />
    },
    {
      key: '2',
      label: 'My Auction',
      children: 'My Auction'
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
