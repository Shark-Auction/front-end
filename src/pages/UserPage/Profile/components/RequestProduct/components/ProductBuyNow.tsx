import {
  CheckboxOptionType,
  Form,
  InputNumber,
  Radio,
  RadioChangeEvent,
} from "antd";
import { useState } from "react";
import LabelForm from "../../../../../../components/LabelForm";

const buyNowItem: CheckboxOptionType[] = [
  {
    label: "Không",
    value: false,
  },
  {
    label: "Có",
    value: true,
  },
];

const ProductBuyNow = () => {
  const [value, setValue] = useState(false);
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };
  return (
    <>
      <p className="text-xl text-primaryColor font-semibold col-span-3">
        Sản phẩm có mua ngay hay không?
      </p>
      <Form.Item name={"buyNow"}>
        <Radio.Group
          options={buyNowItem}
          optionType="button"
          buttonStyle="solid"
          defaultValue={false}
          className="mt-2"
          onChange={onChange}
        />
      </Form.Item>
      {value === true && (
        <Form.Item
          name={"buyNowPrice"}
          label={<LabelForm>Nhập giá mua ngay</LabelForm>}
          rules={[
            {
              required: true,
              message: "Không được dể trống",
            },
          ]}
        >
          <InputNumber<number>
            placeholder="Nhập giá mua ngay"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            className="w-2/3"
            min={0}
            controls={false}
          />
        </Form.Item>
      )}
    </>
  );
};

export default ProductBuyNow;
