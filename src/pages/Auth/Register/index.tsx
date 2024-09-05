import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserSignUp } from "../../../model/user";
import { toast } from "react-toastify";
import authApi from "../../../service/api/authApi";
import { useState } from "react";
import dayjs from "dayjs";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const disabledDate = (current: any) => {
    return current && current > new Date();
  };
  const dateFormat: DatePickerProps["format"] = (value) => {
    return `${value.format("YYYY-MM-DD")}`;
  };
  const handleFinish = async (values: UserSignUp) => {
    try {
      setLoading(true);
      const data: UserSignUp = {
        ...values,
        dob: dateFormat(dayjs(values.dob, "YYYY-MM-DD")),
      };
      await authApi.signUpApi(data);
      toast.success(
        <>
          <div>Đăng ký thành công</div>
          <div className="font-semibold">Hãy kiểm tra Email để xác thực tài khoản</div>
        </>
      );
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const validateEmail = async (_: any, value: string) => {
    try {
      await authApi.checkEmail(value);
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };
  const validateUserName = async (_: any, value: string) => {
    try {
      await authApi.checkUser(value);
      return Promise.resolve();
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error.message);
    }
  };
  return (
    <div
      className="w-[650px] px-10 py-5 h-full flex bg-white flex-col items-center 
      justify-center text-black md:border md:shadow-shadowHeavy rounded-md"
    >
      <div className="text-left">
        <p className="text-2xl md:text-3xl">
          <strong>Đăng ký tài khoản</strong>
        </p>
      </div>
      <Divider />
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 24 }}
        className="flex flex-col md:grid md:grid-cols-2 gap-x-5 w-full"
      >
        <Form.Item
          label={<p className="text-lg">Email</p>}
          name={"email"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            {
              validator: validateEmail,
            },
            {
              type: "email",
              message: "Không hợp lệ",
            },
          ]}
          className="md:col-span-2"
        >
          <Input placeholder="abc@gmail.com" />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Tên đăng nhập</p>}
          name={"userName"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            {
              validator: validateUserName,
            },
          ]}
        >
          <Input placeholder="Tên người dùng" />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Họ và tên</p>}
          name={"fullName"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        >
          <Input placeholder="NGUYEN VAN A" />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Số điện thoại</p>}
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            {
              pattern: /^\d{10}$/,
              message: "Tối thiểu 10 số",
            },
          ]}
        >
          <Input placeholder="0123456789" />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Ngày sinh</p>}
          name={"dob"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        >
          <DatePicker
            format={"YYYY-MM-DD"}
            placeholder="YYYY-MM-DD"
            disabledDate={disabledDate}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label={<p className="text-lg">Địa chỉ</p>}
          name={"address"}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
          className="md:col-span-2"
        >
          <Input placeholder="Q1, Tp.HCM, VN" className="w-full" />
        </Form.Item>
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
          name="confirmPassword"
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

        <Form.Item className="md:col-span-2">
          <Button
            loading={loading}
            htmlType="submit"
            className="bg-black w-full py-4 text-lg text-white px-10 
            hover:!bg-black hover:!border-black hover:!text-white mt-2"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <Link to={"/auth/login"} className="text-lg text-blue-500 font-semibold">
        Tôi đã có tài khoản
      </Link>
    </div>
  );
};

export default RegisterPage;
