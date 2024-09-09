import { Form, Input, InputNumber, Select } from "antd";
import LabelForm from "../../../../../../components/LabelForm";
import { selectItems } from "../../../../../../service/data/conditionItem";

const ProductInformation = () => {
  return (
    <>
      <p className="text-xl text-primaryColor font-semibold col-span-3">
        Thông tin sản phẩm
      </p>
      <Form.Item
        label={<LabelForm>Tên sản phẩm</LabelForm>}
        name={"name"}
        className="col-span-3"
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>
      <Form.Item
        label={<LabelForm>Giá khởi điểm (VNĐ)</LabelForm>}
        name={"startingPrice"}
        className="col-span-1"
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        <InputNumber<number>
          placeholder="Nhập giá khởi điểm"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          className="w-full"
          min={0}
          controls={false}
        />
      </Form.Item>
      <Form.Item
        label={<LabelForm>Điều kiện sản phẩm</LabelForm>}
        name={"condition"}
        className="col-span-1"
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Chọn..."
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={selectItems}
        />
      </Form.Item>
    </>
  );
};

export default ProductInformation;
