import { Form, Input } from "antd";
import ButtonPrimary from "../../../../../../components/Button";

interface ProfileInformationProps {
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
}

const ProfileInformation = ({
  email,
  name,
  phoneNumber,
  address,
}: ProfileInformationProps) => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{
        username: name,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
      }}
      className="w-3/5"
    >
      <Form.Item name={"email"} label={"Email"}>
        <Input />
      </Form.Item>
      <div className="grid grid-cols-2 gap-2">
        <Form.Item label={"Name"} name="username">
          <Input />
        </Form.Item>
        <Form.Item label={"Phone"} name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item className="col-span-2" label={"Address"} name={"address"}>
          <Input />
        </Form.Item>
      </div>
      <Form.Item className="w-full flex justify-center">
        <ButtonPrimary
          htmlType="submit"
          className="!text-base !px-10 !py-4 font-bold"
        >
          Edit
        </ButtonPrimary>
      </Form.Item>
    </Form>
  );
};

export default ProfileInformation;
