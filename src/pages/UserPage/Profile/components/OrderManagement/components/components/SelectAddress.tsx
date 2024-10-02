import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { orderApi } from "../../../../../../../service/api/orderApi";
import { Form, Input, Select } from "antd";
import LabelForm from "../../../../../../../components/LabelForm";

const SelectAddress = () => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isDistrict, setIsDisctrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [form] = Form.useForm();
  const handleDistrict = async (province: {
    value: string;
    label: React.ReactNode;
  }) => {
    if (province) {
      const response = await orderApi.getDistrictApi(province.value);
      const optionResponse = response.data.map((e: any) => ({
        label: e.DistrictName,
        value: e.DistrictID,
      }));
      setDistrict(optionResponse);
      setIsDisctrict(true);
    } else {
      setIsDisctrict(false);
      setIsWard(false);
      form.setFieldsValue({
        district: null,
        ward: null,
      });
    }
  };
  const handleWard = async (district: any) => {
    if (district) {
      const response = await orderApi.getWardApi(district.value);
      const optionResponse = await response.data.map((e: any) => ({
        label: e.WardName,
        value: e.WardCode,
      }));
      setWard(optionResponse);
      setIsWard(true);
    } else {
      setIsWard(false);
      form.setFieldsValue({
        ward: null,
      });
    }
  };
  const fetchDataCity = async () => {
    try {
      const responseProvince = await orderApi.getProvinceApi();
      const optionResponse = responseProvince.data.map((e: any) => ({
        label: e.ProvinceName,
        value: e.ProvinceID,
      }));
      setProvince(optionResponse);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDataCity();
  }, []);
  return (
    <>
      <div className="md:grid grid-cols-3 gap-x-2">
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được để trống!",
            },
          ]}
          name={"province"}
          label={<LabelForm>Chọn tỉnh/thành phố:</LabelForm>}
        >
          <Select
            placeholder="Chọn tỉnh/thành"
            labelInValue
            options={province}
            optionFilterProp="children"
            showSearch
            allowClear
            onChange={handleDistrict}
            filterOption={(input: any, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được để trống!",
            },
          ]}
          name={"district"}
          label={<LabelForm>Chọn quận/thị xã:</LabelForm>}
        >
          <Select
            placeholder="Chọn quận/thị xã"
            labelInValue
            options={district}
            optionFilterProp="children"
            showSearch
            onChange={handleWard}
            filterOption={(input: any, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            disabled={!isDistrict}
            allowClear
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không được để trống!",
            },
          ]}
          name={"ward"}
          label={<LabelForm>Chọn phường:</LabelForm>}
        >
          <Select
            placeholder="Chọn phường"
            labelInValue
            options={ward}
            optionFilterProp="children"
            showSearch
            filterOption={(input: any, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            disabled={!isWard}
            allowClear
          />
        </Form.Item>
      </div>
      <Form.Item
        name={"address"}
        label={<LabelForm>Địa chỉ:</LabelForm>}
        rules={[
          {
            required: true,
            message: "Không được để trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default SelectAddress;
