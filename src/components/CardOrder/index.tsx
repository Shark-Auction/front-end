import { Card, Divider, Tag } from "antd";
import ImageComponent from "../Image";
import { formatVND } from "../../utils/format";
import ButtonPrimary from "../Button";

const CardOrder = () => {
  return (
    <Card
      className="w-full flex overflow-hidden shadow-shadowLight"
      cover={
        <ImageComponent
          width={"100%"}
          height={300}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
      bodyStyle={{ width: "80%", display: "flex", justifyContent: "flex-end" }}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Phuck du</p>
          <p className="text-lg">Giá chốt: <strong className="text-orange-600 text-xl">{formatVND(120000)}</strong></p>
          <p className="text-lg">Thời gian thanh toán: <Tag className="!text-base" color="blue">12/10/2024</Tag></p>
          <Divider className="my-1" />
          <p className="text-lg">Trạng thái giao hàng: <Tag className="!text-base" color="cyan">Đang giao hàng</Tag></p>
        </div>
        <div className="w-full flex justify-end gap-5">
          <ButtonPrimary className="!text-base">Xem chi tiết</ButtonPrimary>
          <ButtonPrimary hover="!bg-gradient-orange" className="!text-base !bg-gradient-orange">Đánh giá</ButtonPrimary>
        </div>
      </div>
    </Card>
  );
};

export default CardOrder;
