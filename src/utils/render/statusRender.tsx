import { Tag } from "antd"

export const status: any = {
  "PENDING": () => {
    return <Tag color="blue">Chuẩn bị</Tag>
  },
  "CONFIRMING": () => {
    return <Tag color="cyan">Đang duyệt</Tag>
  },
  "SCHEDULING": () => {
    return <Tag color="geekblue">Đang lên lịch</Tag>
  },
  "AUCTIONING": () => {
    return <Tag color="gold">Đang đấu giá</Tag>
  },
  "AUCTIONSUCCESS": () => {
    return <Tag color="green">Đấu giá thành công</Tag>
  },
  "DELIVERING": () => {
    return <Tag color="lime">Đang giao hàng</Tag>
  },
  "DELIVERED": () => {
    return <Tag color="magenta">Đã giao</Tag>
  },
  "AUCTIONFAIL": () => {
    return <Tag color="error">Thất bại</Tag>
  }
}
