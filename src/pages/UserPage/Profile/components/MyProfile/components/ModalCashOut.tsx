import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../../../../components/Button";
import LabelForm from "../../../../../../components/LabelForm";
import { CashOuts } from "../../../../../../model/cashOut";
import { cashOutApi } from "../../../../../../service/api/cashOutApi";

const { Option } = Select;

const ModalCashOut = () => {
  const [open, setOpen] = useState(false);
  const [banking, setBanking] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpen(false);
    setSearchTerm("");
    form.resetFields();
  };

  const handleFinish = async (values: CashOuts) => {
    try {
      setLoading(true);
      const response = await cashOutApi.cashOutMoney(values);
      toast.success(
        <div>
          <p>{response.message}</p>
          <p className="text-orange-600">Nhân viên sẽ sớm chuyển tiền cho bạn</p>
        </div>
      );
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cashOutApi.getBanking();
        setBanking(response.data);
      } catch (error: any) {
        toast.error(error.messages);
      }
    };
    if (open) {
      fetchData();
    }
  }, [open]);

  const filteredBanking = banking.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ButtonPrimary
        onClick={() => setOpen(true)}
        className="!text-base font-medium"
      >
        Rút tiền
      </ButtonPrimary>

      <Modal
        footer={null}
        title={<p className="!text-lg">Rút tiền</p>}
        open={open}
        onCancel={handleCancel}
        width={700}
        loading={loading}
      >
        <Form onFinish={handleFinish} form={form} labelCol={{ span: 24 }}>
          <Form.Item
            name={"bankAccountName"}
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
            label={<LabelForm>Tên ngân hàng nhận:</LabelForm>}
          >
            <Select
              placeholder="Chọn ngân hàng"
              className="!h-14"
              dropdownRender={(menu) => (
                <>
                  <div className="px-2 py-1">
                    <Input
                      placeholder="Tìm kiếm ngân hàng"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {menu}
                </>
              )}
            >
              {filteredBanking.map((element) => (
                <Option key={element.name} value={element.name}>
                  <div className="flex items-center gap-10 !h-14">
                    <img
                      src={element.logo}
                      className="rounded-xl w-36 h-36 object-contain"
                      alt={element.name}
                    />
                    <span>{element.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<LabelForm>Số tài khoản:</LabelForm>}
            name={"bankAccountNumber"}
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
              {
                pattern: /^\d/,
                message: "Bạn phải nhập số",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <ButtonPrimary htmlType="submit">Rút tiền</ButtonPrimary>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCashOut;
