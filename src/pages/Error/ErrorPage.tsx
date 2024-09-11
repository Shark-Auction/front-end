import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <p className="text-xl">
          Đường dẫn{" "}
          <span className="font-semibold text-red-500">
            {location.pathname}
          </span>{" "}
          không tồn tại
        </p>
      }
      extra={
        <Button
          className="text-base"
          onClick={() => navigate("/u/home")}
          type="primary"
        >
          Trở lại trang chủ
        </Button>
      }
    />
  );
};

export default ErrorPage;
