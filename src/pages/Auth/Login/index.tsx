import { Button, Divider, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginInformation } from "../../../model/user";
import authApi from "../../../service/api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../../core/store/slice/userSlice";

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleFinish = async (values: LoginInformation) => {
    try {
      setLoading(true);
      const response = await authApi.signIn(values);
      toast.success('Đăng nhập thành công')
      dispatch(login(response.data))
      if(response.data.roleName === 'User') {
        navigate('/u/home')
      } else {
        navigate('/Admin')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className="w-[500px] p-10 h-full flex bg-white flex-col items-center 
      justify-center text-black md:border md:shadow-shadowHeavy rounded-md"
    >
      <div className="text-center">
        <p className="text-2xl md:text-3xl">
          <strong>Đăng nhập</strong> vào tài khoản của bạn
        </p>
        <p className="text-xl md:text-xl mt-2">
          Không có tài khoản?{" "}
          <Link
            to={"/auth/register"}
            className="text-primaryColor hover:text-primaryColor font-bold"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
      <Divider />
      <div className="w-full">
        <div className="w-full">
          <Form onFinish={handleFinish} labelCol={{ span: 24 }} className="w-full flex flex-col gap-[1px]">
            <Form.Item
              label={<p className="text-lg">Tên đăng nhập</p>}
              name={"user_name"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<p className="text-lg">Mật khẩu</p>}
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Link to={"/auth/login"} className="text-lg text-blue-500">
              Quên mật khẩu
            </Link>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                className="bg-black w-full py-4 text-lg text-white px-10 hover:!bg-black hover:!border-black hover:!text-white mt-2"
              >
                Đăng nhập
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
