import { Divider, Form, Input } from "antd";
import LabelForm from "../../../../../components/LabelForm";
import ButtonPrimary from "../../../../../components/Button";

const ChangePassword = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Đổi mật khẩu</p>
        <p className="text-base text-gray-500">Đổi mật khẩu mới tại đây</p>
      </div>
      <Divider className="my-5" />
      <Form
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
          name="password"
          label={<LabelForm>Mật khẩu mới</LabelForm>}
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<LabelForm>Xác nhận mật khẩu</LabelForm>}
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
        <Form.Item className="w-full flex justify-center">
          <ButtonPrimary htmlType="submit" className="!text-base font-medium">
            Đổi mật khẩu
          </ButtonPrimary>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword
