import { DatePicker, Form, InputNumber } from "antd";
import LabelForm from "../../LabelForm";
import { formatVND } from "../../../utils/format";
interface AddAuctionProps {
  data: any;
  updateDate?: boolean;
}
const { RangePicker } = DatePicker;

const DateRangeAuction = ({ data, updateDate = false }: AddAuctionProps) => {
  const validateStartDate = (_: any, value: any) => {
    const selectedStartDate = value && value[0];
    const currentDate = new Date();
    if (!selectedStartDate || selectedStartDate.isAfter(currentDate)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Hãy chọn ngày lớn hơn hoặc bằng thời điểm hiện tại")
    );
  };

  const validateEndDate = (_: any, value: any) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (
      !selectedEndDate ||
      (selectedStartDate && selectedEndDate.isAfter(selectedStartDate))
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Làm ơn hãy chọn ngày bắt đầu và ngày kết thúc")
    );
  };
  const validateDateRange = (_: any, value: any) => {
    const selectedStartDate = value && value[0];
    const selectedEndDate = value && value[1];
    if (selectedStartDate && selectedEndDate) {
      const daysDiff = selectedEndDate.diff(selectedStartDate, "days");
      if (daysDiff > 7) {
        return Promise.reject(
          new Error("Ngày bắt đầu và ngày kết thúc phải trong vòng 7 ngày")
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error("Hãy chọn khoảng ngày phù hợp"));
  };
  const disabled7DaysDate = (current: any, { from }: any) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
  };
  return (
    <>
      <Form.Item
        label={updateDate === false && <LabelForm>Chọn khoảng ngày cho cuộc đấu giá</LabelForm>}
        name="dateRange"
        rules={[
          { required: true, message: "Không được để trống!" },
          { validator: validateStartDate },
          { validator: validateEndDate },
          { validator: validateDateRange },
        ]}
      >
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          className="!w-full"
          needConfirm={false}
          disabledDate={disabled7DaysDate}
        />
      </Form.Item>
      {updateDate === false && (
        <Form.Item
          label={
            <LabelForm>
              Bước nhảy (5% của{" "}
              <span className="text-orange-600">
                giá trị khởi điểm: {formatVND(data?.startingPrice)}
              </span>
              )
            </LabelForm>
          }
          name="step"
          rules={[
            {
              required: true,
              message: "Không được dể trống",
            },
          ]}
        >
          <InputNumber<number>
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            className="!w-full"
            controls={false}
            readOnly
          />
        </Form.Item>
      )}
    </>
  );
};

export default DateRangeAuction;
