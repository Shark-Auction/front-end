import {
  CheckboxOptionType,
  Form,
  InputNumber,
  Radio,
  RadioChangeEvent,
} from "antd";
import LabelForm from "../../../../../../../../../components/LabelForm";
import { useEffect, useState } from "react";

interface ItemBuyNowProps {
  buyNow: boolean;
}

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

const ItemBuyNow = ({ buyNow }: ItemBuyNowProps) => {
  const [value, setValue] = useState(false);
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };
  useEffect(() => {
    setValue(buyNow)
  }, [buyNow])

  return (
    <>
      <Form.Item
        name={"buyNow"}
        label={<LabelForm>Sản phẩm có mua ngay không</LabelForm>}
      >
        <Radio.Group
          options={buyNowItem}
          optionType="button"
          buttonStyle="solid"
          defaultValue={false}
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
            className="w-full"
            min={0}
            controls={false}
          />
        </Form.Item>
      )}
    </>
  );
};

export default ItemBuyNow;
