import { Tag } from "antd";

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
        Đang duyệt
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
  NaN: () => {
    return "NaN";
  },
};
