import { Form, Input } from "antd";
import ButtonPrimary from "../../../../../../components/Button";
import { User } from "../../../../../../model/user";
import LabelForm from "../../../../../../components/LabelForm";

interface ProfileInformationProps {
  data?: User;
}

const ProfileInformation = ({ data }: ProfileInformationProps) => {
  const [form] = Form.useForm();
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
      className="w-full md:w-3/5"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      layout="horizontal"
    >
      <Form.Item name={"email"} label={<LabelForm>Email</LabelForm>}>
        <Input />
      </Form.Item>
      <Form.Item label={<LabelForm>Tên</LabelForm>} name="username">
        <Input />
      </Form.Item>
      <Form.Item
        label={<LabelForm>Số điện thoại</LabelForm>}
        name="phoneNumber"
      >
        <Input />
      </Form.Item>
      <Form.Item label={<LabelForm>Địa chỉ</LabelForm>} name={"address"}>
        <Input />
      </Form.Item>
      <Form.Item className="w-full flex justify-center">
        <ButtonPrimary
          htmlType="submit"
          className="!text-base !px-10 !py-4 font-bold"
        >
          Chỉnh sửa
        </ButtonPrimary>
      </Form.Item>
    </Form>
  );
};

export default ProfileInformation;
