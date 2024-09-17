import { Button, Form, Modal, Popconfirm, Steps, Tour } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { productApi } from "../../../../../../../../service/api/productApi";
import { ProductDetailRequest } from "../../../../../../../../model/product";
import ItemBrandOrigin from "./ModalEdit/ItemBrandOrigin";
import ItemInformation from "./ModalEdit/ItemInformation";
import ItemCategory from "./ModalEdit/ItemCategory";
import ItemDescription from "./ModalEdit/ItemDescription";
import ButtonPrimary from "../../../../../../../../components/Button";
import { auctionApi } from "../../../../../../../../service/api/auctionApi";
import type { TourProps } from "antd";
import DateRangeAuction from "../../../../../../../../components/FormItem/DateRangeAuction";
import { ProductProfile } from "../../../../../../../../model/profile";

interface ModalDetailProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ProductProfile | any;
  setRender?: any;
}

const ModalDetail = ({ open, setOpen, data, setRender }: ModalDetailProps) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [form] = Form.useForm();
  const [dataItem, setDataItem] = useState<ProductProfile>();
  const [imageDescription, setImageDescription] = useState<string[]>([]);
  const [renderDetail, setRenderDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);
  const [checkedDelete, setCheckedDelete] = useState<boolean>(false);

  const tutorialSteps: TourProps["steps"] = [
    {
      title: "Chỉnh sửa",
      description: "Chỉnh sửa các thông tin bạn cần chỉnh sửa tại đây",
      target: () => ref1?.current,
      nextButtonProps: { children: "Tiếp theo" },
    },
    {
      title: "Xác nhận",
      description:
        'Sau khi điều chỉnh, nhấn nút "Chỉnh sửa" để hoàn tất quá trình chỉnh sửa',
      target: () => ref2?.current,
      prevButtonProps: { children: "Trở lại" },
      nextButtonProps: { children: "Hoàn thành" },
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancle = () => {
    setOpen(false);
    setCurrent(0);
    form.resetFields();
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      setLoading(true);
      await productApi.deleteProduct(id);
      toast.success(`Xóa sản phẩm ${name} thành công`);
      setRender(true);
      setCheckedDelete(true);
      handleCancle();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values: ProductDetailRequest) => {
    try {
      setLoading(true);
      await productApi.editProduct(dataItem?.id, values);
      toast.success("Cập nhật thành công");
      setRender(true);
      setRenderDetail(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAuction = async (values: any) => {
    try {
      const startTime = values.dateRange
        ? values.dateRange[0].format("YYYY-MM-DD HH:mm")
        : "";
      const endTime = values.dateRange
        ? values.dateRange[1].format("YYYY-MM-DD HH:mm")
        : "";
      const step = values.step || 0;
      const formData = {
        productId: dataItem?.id,
        startTime,
        endTime,
        step,
      };
      setLoading(true);
      await auctionApi.addAuction(formData);
      toast.success("Đăng sản phẩm lên trang đấu giá thành công");
      setRender(true);
      handleCancle();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Chi tiết sản phẩm",
      content: (
        <div ref={ref1}>
          <Form
            form={form}
            onFinish={handleEdit}
            labelCol={{ span: 24 }}
            className="grid grid-cols-4 gap-x-5"
          >
            <ItemInformation />
            <ItemCategory />
            <ItemBrandOrigin />
            <ItemDescription setImageDescription={setImageDescription} />
          </Form>
        </div>
      ),
    },
    {
      title: "Đăng đấu giá",
      content: (
        <Form
          onFinish={handleAddAuction}
          initialValues={{
            step: dataItem?.startingPrice && dataItem?.startingPrice,
          }}
          labelCol={{ span: 24 }}
          className="grid grid-cols-2 gap-x-5"
          form={form}
        >
          <DateRangeAuction data={dataItem} />
        </Form>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    if (open && dataItem) {
      const stepValue = dataItem.startingPrice * 0.05;
      form.setFieldsValue({
        step: stepValue,
      });
      form.setFieldsValue({
        categoryId: dataItem?.category?.id,
        brandName: dataItem?.brand?.name,
        originName: dataItem?.origin?.name,
        ...dataItem,
      });
    }
  }, [dataItem, form, open]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProductById(data?.id);
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
    if (renderDetail) {
      fetchData();
    }
  }, [checkedDelete, data?.id, open, renderDetail]);

  return (
    <Modal
      title={
        <p className="text-xl">
          Chi tiết sản phẩm{" "}
          <span
            onClick={() => setOpenTutorial(true)}
            className="text-blue-500 underline underline-offset-2 cursor-pointer"
          >
            (Hướng dẫn chỉnh sửa)
          </span>
        </p>
      }
      open={open}
      loading={loading}
      onCancel={handleCancle}
      width={1000}
      footer={
        dataItem && [
          current < steps.length - 1 && (
            <div className="flex justify-end gap-2" key={"first-step"}>
              {dataItem.status === "PENDING" && (
                <Popconfirm
                  key={"delete-pop"}
                  title={`Xóa sản phẩm ${dataItem?.name}`}
                  description="Bạn có muốn xóa không?"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => handleDelete(dataItem?.id, dataItem?.name)}
                >
                  <Button
                    type="primary"
                    key={"delete"}
                    className="!text-base"
                    danger
                  >
                    Xóa sản phẩm
                  </Button>
                </Popconfirm>
              )}
              {dataItem.status === "PENDING" && (
                <Button
                  key={"edit"}
                  className="!text-base"
                  onClick={() => form.submit()}
                  type="primary"
                  ref={ref2}
                >
                  Chỉnh sửa sản phẩm
                </Button>
              )}
              {dataItem.status === "CONFIRMING" && <ButtonPrimary
                key={"auction"}
                className="text-base"
                onClick={() => next()}
              >
                Đăng lên trang đấu giá
              </ButtonPrimary>}
            </div>
          ),
          current > 0 && (
            <div key={"second-step"} className="flex justify-end gap-2">
              <Button className="!text-base" key="back" onClick={prev}>
                Trở lại
              </Button>
              <Button
                className="!text-base"
                key={"confirm-auction"}
                type="primary"
                onClick={() => form.submit()}
              >
                Đăng đấu giá
              </Button>
            </div>
          ),
        ]
      }
    >
      <Steps current={current} items={items} />
      <div className="steps-content mt-5">{steps[current].content}</div>
      {openTutorial && ref1.current && ref2.current && (
        <Tour
          open={openTutorial}
          onClose={() => setOpenTutorial(false)}
          steps={tutorialSteps}
        />
      )}
    </Modal>
  );
};

export default ModalDetail;
