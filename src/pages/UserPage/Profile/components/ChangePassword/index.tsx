import { Divider, Form, Input } from "antd";
import LabelForm from "../../../../../components/LabelForm";
import ButtonPrimary from "../../../../../components/Button";
import { ChangePasswordData } from "../../../../../model/profile";
import { toast } from "react-toastify";
import { useState } from "react";
import { profileApi } from "../../../../../service/api/profileApi";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const handleFinish = async (values: ChangePasswordData) => {
    try {
      setLoading(true);
      await profileApi.changePassword(values);
      toast.success("Đổi mật khẩu thành công");
      form.resetFields();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Đổi mật khẩu</p>
        <p className="text-base text-gray-500">Đổi mật khẩu mới tại đây</p>
      </div>
      <Divider className="my-5" />
      <Form
        onFinish={handleFinish}
        form={form}
        className="w-full lg:w-4/5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
        layout="horizontal"
      >
        <Form.Item
          name={"oldPassword"}
          label={<LabelForm>Mật khẩu cũ</LabelForm>}
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
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={<LabelForm>Mật khẩu mới</LabelForm>}
          dependencies={["oldPassword"]}
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
            {
              min: 6,
              message: "Tối thiểu 6 kí tự",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("oldPassword") === value) {
                  return Promise.reject(new Error("Mật khẩu mới trùng với mật khẩu cũ"));
                }
                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmedPassword"
          label={<LabelForm>Xác nhận mật khẩu</LabelForm>}
          dependencies={["newPassword"]}
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
        <Form.Item className="w-full flex justify-center">
          <ButtonPrimary
            loading={loading}
            htmlType="submit"
            className="!text-base font-medium"
          >
            Đổi mật khẩu
          </ButtonPrimary>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
