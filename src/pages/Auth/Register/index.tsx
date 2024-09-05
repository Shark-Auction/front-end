import { Button, DatePicker, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  return (
    <div
      className="w-[650px] px-10 py-5 h-full flex bg-white flex-col items-center 
      justify-center text-black md:border md:shadow-shadowHeavy rounded-md"
    >
      <div className="text-left">
        <p className="text-2xl md:text-3xl">
          <strong>Register new account</strong>
        </p>
      </div>
      <Divider />
      <Form
        form={form}
        labelCol={{ span: 24 }}
        className="flex flex-col md:grid md:grid-cols-2 gap-x-5 w-full"
      >
        <Form.Item
          label={<p className="text-lg">Email</p>}
          name={"username"}
          rules={[
            {
              required: true,
              message: "Must not be empty",
            },
          ]}
          className="md:col-span-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Fullname</p>}
          name={"fullName"}
          rules={[
            {
              required: true,
              message: "Must not be empty",
            },
          ]}
          className="md:col-span-2"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Phone number</p>}
          name={"phoneNumber"}
          rules={[
            {
              required: true,
              message: "Must not be empty",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Date of birth</p>}
          name={"dateOfBirth"}
          rules={[
            {
              required: true,
              message: "Must not be empty",
            },
          ]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Address</p>}
          name={"address"}
          rules={[
            {
              required: true,
              message: "Must not be empty",
            },
          ]}
          className="md:col-span-2"
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<p className="text-lg">Password</p>}
          rules={[
            {
              required: true,
              message: "Must not be empty!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<p className="text-lg">Confirm Password</p>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Must not be empty!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="md:col-span-2">
          <Button
            htmlType="submit"
            className="bg-black w-full py-4 text-lg text-white px-10 
            hover:!bg-black hover:!border-black hover:!text-white mt-2"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <Link to={"/auth/login"} className="text-lg text-blue-500 font-semibold">
        I already have account
      </Link>
    </div>
  );
};

export default RegisterPage;
