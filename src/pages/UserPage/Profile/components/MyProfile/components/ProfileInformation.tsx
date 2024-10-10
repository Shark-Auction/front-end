import { Form, Input, InputNumber, Space } from "antd";
import { useSelector } from "react-redux";
import LabelForm from "../../../../../../components/LabelForm";
import { RootState } from "../../../../../../core/store/store";
import { User } from "../../../../../../model/user";
import ModalCashOut from "./ModalCashOut";

interface ProfileInformationProps {
  data?: User;
}

const ProfileInformation = ({ data }: ProfileInformationProps) => {
  const [form] = Form.useForm();
  const wallet = useSelector((state: RootState) => state.wallet);
  const handleFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{
        username: data?.full_name,
        phoneNumber: data?.phone_number,
        address: data?.address,
        email: data?.email,
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      layout="horizontal"
    >
      <Form.Item name={"email"} label={<LabelForm>Email</LabelForm>}>
        <Input readOnly />
      </Form.Item>
      <Form.Item label={<LabelForm>Tên</LabelForm>} name="username">
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label={<LabelForm>Số điện thoại</LabelForm>}
        name="phoneNumber"
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item label={<LabelForm>Địa chỉ</LabelForm>} name={"address"}>
        <Input readOnly />
      </Form.Item>
      <Form.Item label={<LabelForm>Số tiền</LabelForm>}>
        <Space.Compact className="w-full">
          <InputNumber<number>
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            className="w-1/2"
            min={0}
            readOnly
            controls={false}
            value={wallet ? wallet : 0}
          />
          <ModalCashOut />
        </Space.Compact>
      </Form.Item>
    </Form>
  );
};

export default ProfileInformation;
