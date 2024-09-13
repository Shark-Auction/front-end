import {
  Button,
  Descriptions,
  DescriptionsProps,
  Form,
  Modal,
  Popconfirm,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../../../../../../../components/Button";
import {
  condition,
  statusAuction,
} from "../../../../../../../../utils/render/statusRender";
import { formatVND } from "../../../../../../../../utils/format";
import {
  MyAuctionProfile,
  UpdateAuctionDate,
  UpdateAuctionDateData,
} from "../../../../../../../../model/profile";
import DateRangeAuction from "../../../../../../../../components/FormItem/DateRangeAuction";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { auctionApi } from "../../../../../../../../service/api/auctionApi";
import { useNavigate } from "react-router-dom";
interface ModalDetailProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: MyAuctionProfile | any;
  setRender?: any;
}
const ModalDetail = ({ open, setOpen, data, setRender }: ModalDetailProps) => {
  const [dataItem, setDataItem] = useState<MyAuctionProfile>();
  const [loading, setLoading] = useState(false);
  const [renderDetail, setRenderDetail] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (values: UpdateAuctionDateData) => {
    const formattedDate: UpdateAuctionDate = {
      startTime: values.dateRange[0].format("YYYY-MM-DD HH:mm"),
      endTime: values.dateRange[1].format("YYYY-MM-DD HH:mm"),
    };
    try {
      setLoading(true);
      if (dataItem?.status === "Cancel") {
        await auctionApi.reAuction(dataItem?.id, formattedDate);
      } else {
        await auctionApi.updateAuction(dataItem?.id, formattedDate);
      }
      toast.success("Cập nhật ngày cho phiên đấu giá thành công");
      setRender(true);
      setRenderDetail(true)
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await auctionApi.cancelAuction(dataItem?.id);
      toast.success("Hủy phiên thành công");
      setRender(true);
      setRenderDetail(true)
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const itemsProduct: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "Tên",
      children: dataItem?.product?.name,
    },
    {
      key: "category",
      label: "Danh mục",
      children: (
        <>
          <Tag color="blue">{dataItem?.product?.category?.name}</Tag>
          {dataItem?.product?.category?.parent && (
            <Tag color="blue-inverse">
              {dataItem?.product?.category?.parent?.name}
            </Tag>
          )}
        </>
      ),
    },
    {
      key: "brand",
      label: "Hãng",
      children: <Tag color="cyan">{dataItem?.product?.brand?.name}</Tag>,
    },
    {
      key: "origin",
      label: "Xuất xứ",
      children: <Tag color="geekblue">{dataItem?.product?.origin?.name}</Tag>,
    },
    {
      key: "condition",
      label: "Điều kiện",
      children: <p>{dataItem && condition[dataItem?.product?.condition]()}</p>,
    },
  ];
  const itemsAuction: DescriptionsProps["items"] = [
    {
      key: "startTime",
      label: "Khoảng thời gian đấu giá",
      children: (
        <div>
          <Form form={form} onFinish={handleSubmit}>
            <DateRangeAuction updateDate={true} data={dataItem} />
          </Form>
        </div>
      ),
      span: 2,
    },
    {
      key: "step",
      label: "Bước nhảy",
      children: (
        <p className="text-base text-orange-600">
          {formatVND(dataItem?.step || 0)}
        </p>
      ),
    },
    {
      key: "startingPrice",
      label: "Giá khởi điển",
      children: (
        <p className="text-base text-orange-600">
          {formatVND(dataItem?.product?.startingPrice || 0)}
        </p>
      ),
    },
    {
      key: "currentPrice",
      label: "Giá hiện tại",
      children: (
        <p className="text-base text-orange-600">
          {formatVND(dataItem?.currentPrice || 0)}
        </p>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      children: <>{statusAuction[dataItem ? dataItem.status : "NaN"]()}</>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAuctionById(data?.id);
        setDataItem(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchData();
    }
    if(renderDetail) {
      fetchData();
    }
  }, [data?.id, open, renderDetail]);

  useEffect(() => {
    if (open) {
      const start = dataItem?.startTime ? dayjs(dataItem.startTime) : null;
      const end = dataItem?.endTime ? dayjs(dataItem.endTime) : null;
      form.setFieldsValue({ dateRange: [start, end] });
    }
  }, [data, dataItem?.endTime, dataItem?.startTime, form, open]);
  return (
    <Modal
      loading={loading}
      width={1000}
      open={open}
      onCancel={handleClose}
      title={<p className="text-xl">Chi tiết đấu giá</p>}
      footer={[
        dataItem?.status === "InProgress" && (
          <Popconfirm
            key={"delete-pop"}
            title={`Hủy phiên đấu giá`}
            description="Bạn có muốn hủy phiên này không?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDelete()}
          >
            <Button type="primary" key={"cancel"} className="!text-base" danger>
              Hủy phiên đấu giá
            </Button>
          </Popconfirm>
        ),
        (dataItem?.status === "Waiting" || dataItem?.status === "Cancel") && (
          <Button
            onClick={() => form.submit()}
            type="primary"
            className={`text-base font-bold ${
              dataItem?.status === "Cancel" && "bg-orange-500"
            }`}
            key={"edit"}
          >
            {dataItem?.status === "Cancel" && <>Tái mở phiên đấu giá</>}
            {dataItem?.status === "Waiting" && <>Chỉnh sửa ngày đấu giá</>}
          </Button>
        ),
        <ButtonPrimary
          onClick={() => navigate(`/u/auction/${data?.id}`)}
          className="!text-base"
          key={"go-to"}
        >
          Tới phiên đấu giá
        </ButtonPrimary>,
      ]}
    >
      <Descriptions
        items={itemsProduct}
        title={
          <p className="text-base font-semibold text-primaryColor">
            Thông tin sản phẩm
          </p>
        }
        bordered
        layout="vertical"
      />
      <Descriptions
        items={itemsAuction}
        title={
          <p className="text-base font-semibold text-primaryColor">
            Thông tin đấu giá
          </p>
        }
        bordered
        layout="vertical"
      />
    </Modal>
  );
};

export default ModalDetail;
