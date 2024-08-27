import { Button, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div
      className="w-[500px] p-10 h-full flex bg-white flex-col items-center 
      justify-center text-black md:border md:shadow-shadowHeavy rounded-md"
    >
      <div className="text-center">
        <p className="text-2xl md:text-3xl">
          Welcome, <strong>Sign in</strong> your account
        </p>
        <p className="text-xl md:text-xl mt-2">
          Don't have account?{" "}
          <Link
            to={"/auth/register"}
            className="text-primaryColor hover:text-primaryColor font-bold"
          >
            Sign up now
          </Link>
        </p>
      </div>
      <Divider />
      <div className="w-full">
        <div className="w-full">
          <Form labelCol={{ span: 24 }} className="w-full flex flex-col gap-[1px]">
            <Form.Item
              label={<p className="text-lg">Username</p>}
              name={"username"}
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
              label={<p className="text-lg">Password</p>}
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Must not be empty",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Link to={"/auth/login"} className="text-lg text-blue-500">
              Forget Password
            </Link>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-black w-full py-4 text-lg text-white px-10 hover:!bg-black hover:!border-black hover:!text-white mt-2"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <div>
          <Divider type="vertical" className="!border-gray-300 !h-full" />
        </div>
        <div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
