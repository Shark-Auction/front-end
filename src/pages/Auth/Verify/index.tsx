import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../config/axios/api";

const VerifyPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchVerify = async () => {
      try {
        await api.get(`user/verify?userId=${userId}&token=${token}`);
        setStatus(true);
      } catch (error: any) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    };
    fetchVerify();
  }, [token, userId]);
  return status ? (
    <Result
      className="bg-white rounded-lg w-[500px]"
      status="success"
      title="Định danh email thành công"
      subTitle="Chào mừng đến với shark auction. Hãy đấu giá ngay nào"
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/u/home')}>
          Đấu giá
        </Button>,
      ]}
    />
  ) : (
    <Result
      className="bg-white rounded-lg md:w-[500px]"
      status="error"
      title="Định danh email thất bại"
      subTitle={`Lỗi: ${message}`}
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/u/home')}>
          Trở về trang chủ
        </Button>,
      ]}
    />
  );
};

export default VerifyPage;
