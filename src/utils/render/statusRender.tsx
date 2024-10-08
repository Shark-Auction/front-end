import { Badge, Tag } from "antd";

const textStyle = "!text-base";

export const condition: any = {
  NOTUSE: () => {
    return (
      <Tag className={textStyle} color="blue">
        Chưa sử dụng
      </Tag>
    );
  },
  HIGHNEW: () => {
    return (
      <Tag className={textStyle} color="cyan">
        Mới, chưa mở hàng
      </Tag>
    );
  },
  AVERAGENEW: () => {
    return (
      <Tag className={textStyle} color="geekblue">
        Mới, đã mở hàng
      </Tag>
    );
  },
  LOWNEW: () => {
    return (
      <Tag className={textStyle} color="gold">
        Mới, đã sử dụng
      </Tag>
    );
  },
  OLD: () => {
    return (
      <Tag className={textStyle} color="green">
        Cũ
      </Tag>
    );
  },
};

export const status: any = {
  PENDING: () => {
    return (
      <Tag className={textStyle} color="blue">
        Chuẩn bị
      </Tag>
    );
  },
  CONFIRMING: () => {
    return (
      <Tag className={textStyle} color="cyan">
        Đã được duyệt
      </Tag>
    );
  },
  SCHEDULING: () => {
    return (
      <Tag className={textStyle} color="geekblue">
        Đang lên lịch
      </Tag>
    );
  },
  AUCTIONING: () => {
    return (
      <Tag className={textStyle} color="gold">
        Đang đấu giá
      </Tag>
    );
  },
  AUCTIONSUCCESS: () => {
    return (
      <Tag className={textStyle} color="green">
        Đấu giá thành công
      </Tag>
    );
  },
  DELIVERING: () => {
    return (
      <Tag className={textStyle} color="lime">
        Đang giao hàng
      </Tag>
    );
  },
  DELIVERED: () => {
    return (
      <Tag className={textStyle} color="magenta">
        Đã giao
      </Tag>
    );
  },
  AUCTIONFAIL: () => {
    return (
      <Tag className={textStyle} color="error">
        Thất bại
      </Tag>
    );
  },
  SOLD: () => {
    return (
      <Tag className={textStyle} color="orange">
        Đã bán
      </Tag>
    );
  },
};

export const statusAuction: any = {
  Waiting: () => {
    return (
      <Tag className={textStyle} color="blue">
        Đợi đấu giá
      </Tag>
    );
  },
  InProgress: () => {
    return (
      <Tag className={textStyle} color="cyan">
        Đang đấu giá
      </Tag>
    );
  },
  Completed: () => {
    return (
      <Tag className={textStyle} color="geekblue">
        Hoàn thành
      </Tag>
    );
  },
  Cancel: () => {
    return (
      <Tag className={textStyle} color="error">
        Hủy
      </Tag>
    );
  },
  WaitingPay: () => {
    return (
      <Tag className={textStyle} color="green">
        Đợi trả
      </Tag>
    );
  },
  Fail: () => {
    return (
      <Tag className={textStyle} color="red">
        Thất bại
      </Tag>
    );
  },
  WaitingConfirm: () => {
    return (
      <Tag className={textStyle} color="default">
        Chờ xác nhận
      </Tag>
    );
  },
  NaN: () => {
    return "NaN";
  },
};

export const badgeRibbonStatus: any = {
  Waiting: () => {
    return <Badge.Ribbon text="Đợi đấu giá" color="blue" />;
  },
  InProgress: () => {
    return <Badge.Ribbon text="Đang đấu giá" color="cyan" />;
  },
  Completed: () => {
    return <Badge.Ribbon text="Hoàn thành" color="geekblue" />;
  },
  WaitingPay: () => {
    return <Badge.Ribbon text="Đợi trả" color="green" />;
  },
  Cancel: () => {
    return <Badge.Ribbon text="Hủy" color="red" />;
  },
  WaitingConfirm: () => {
    return <Badge.Ribbon text="Chờ xác nhận" color="lime" />;
  },
  Fail: () => {
    return <Badge.Ribbon text="Thất bại" color="red-inverse" />;
  },
};

export const orderStatus: any = {
  pending: () => {
    return (
      <Tag className={textStyle} color="purple-inverse">
        Chưa thanh toán
      </Tag>
    );
  },
  paid: () => {
    return (
      <Tag className={textStyle} color="magenta-inverse">
        Đang thanh toán
      </Tag>
    );
  },
  processing: () => {
    return (
      <Tag className={textStyle} color="geekblue-inverse">
        Đang chờ giao hàng
      </Tag>
    );
  },
  shipping: () => {
    return (
      <Tag className={textStyle} color="gold-inverse">
        Đang giao hàng
      </Tag>
    );
  },
  delivered: () => {
    return (
      <Tag className={textStyle} color="blue-inverse">
        Đã giao hàng
      </Tag>
    );
  },
  received: () => {
    return (
      <Tag className={textStyle} color="green-inverse">
        Đã nhận hàng
      </Tag>
    );
  },
  cancelled: () => {
    return (
      <Tag className={textStyle} color="red-inverse">
        Hủy
      </Tag>
    );
  },
};
