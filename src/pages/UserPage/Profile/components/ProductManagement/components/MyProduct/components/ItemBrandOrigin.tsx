import { Form, Select, Spin } from "antd";
import LabelForm from "../../../../../../../../components/LabelForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { originApi } from "../../../../../../../../service/api/originApi";
import { brandApi } from "../../../../../../../../service/api/brandApi";
interface SelectOption {
  value: string;
  label: string;
}
const ItemBrandOrigin = () => {
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<SelectOption[]>([]);
  const [origin, setOrigin] = useState<SelectOption[]>([]);
  const fetchBrand = async () => {
    try {
      const responseBrand = await brandApi.getBrand();
      setLoading(false);
      const transformedBrand = responseBrand.data.map((element: any) => ({
        value: element.name,
        label: element.name,
      }));
      setBrand(transformedBrand);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const fetchOrigin = async () => {
    try {
      const response = await originApi.getOrigin();
      setLoading(false);
      const transformedOrigin = response.data.map((element: any) => ({
        value: element.name,
        label: element.name,
      }));
      setOrigin(transformedOrigin);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBrand();
    fetchOrigin();
  }, []);
  return (
    <>
      <Form.Item
        name={"brandName"}
        label={<LabelForm>Chọn hãng</LabelForm>}
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        {loading ? (
          <Spin />
        ) : (
          <Select
            showSearch
            placeholder="Chọn..."
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={brand}
          />
        )}
      </Form.Item>
      <Form.Item
        name={"originName"}
        label={<LabelForm>Chọn nơi xuất xứ</LabelForm>}
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        {loading ? (
          <Spin />
        ) : (
          <Select
            showSearch
            placeholder="Chọn..."
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={origin}
          />
        )}
      </Form.Item>
    </>
  );
};

export default ItemBrandOrigin;
