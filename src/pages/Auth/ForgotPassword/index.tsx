import { Divider, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonPrimary from "../../../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import authApi from "../../../service/api/authApi";
interface SetPassword {
  password: string;
  confirmedPassword: string;
}
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const handleFinish = async (values: SetPassword) => {
    try {
      setLoading(true);
      await authApi.setPassword(userId && userId, token, values);
      toast.success("Đổi mật khẩu thành công");
      navigate('/auth/login')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="w-[500px] p-10 h-full flex bg-white flex-col items-center 
      justify-center text-black md:border md:shadow-shadowHeavy rounded-md"
    >
      <p className="text-2xl font-bold">Quên mật khẩu</p>
      <p className="text-base">Nhập mật khẩu mới của bạn tại đây</p>
      <Divider />
      <Form
        onFinish={handleFinish}
        className="!w-full flex flex-col gap-2"
        labelCol={{ span: 24 }}
      >
        <Form.Item
          name="password"
          label={<p className="text-lg">Mật khẩu</p>}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            {
              min: 6,
              message: "Tối thiểu 6 kí tự",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Tối thiểu 6 kí tự" />
        </Form.Item>

        <Form.Item
          name="confirmedPassword"
          label={<p className="text-lg">Xác nhận mật khẩu</p>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <ButtonPrimary
            htmlType="submit"
            loading={loading}
            className="text-lg font-bold !w-full"
          >
            Gửi
          </ButtonPrimary>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
