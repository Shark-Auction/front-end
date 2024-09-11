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

export const statusAuction: any = {
  "Waiting": () => {
    return <Tag color="blue">Đợi đấu giá</Tag>
  },
  "InProgress": () => {
    return <Tag color="cyan">Đang đấu giá</Tag>
  },
  "Completed": () => {
    return <Tag color="geekblue">Hoàn thành</Tag>
  },
  "Cancel": () => {
    return <Tag color="error">Hủy</Tag>
  },
  "WaitingPay": () => {
    return <Tag color="green">Đợi trả</Tag>
  },
}
