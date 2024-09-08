import { Form, Input, Select, Spin } from "antd";
import LabelForm from "../../../../../../components/LabelForm";
import { useEffect, useState } from "react";
import { brandApi } from "../../../../../../service/api/brandApi";
import { toast } from "react-toastify";
import { originApi } from "../../../../../../service/api/originApi";

interface SelectOption {
  value: string;
  label: string;
}

const ProductBrand = () => {
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
      <p className="text-xl text-primaryColor font-semibold col-span-3">
        Hãng và xuất xứ sản phẩm
      </p>
      <Form.Item name={"brandName"} label={<LabelForm>Chọn hãng</LabelForm>}>
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

export default ProductBrand;
