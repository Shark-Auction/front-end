import { DatePicker, Form } from "antd";
import { RuleObject } from "antd/es/form";
import dayjs from "dayjs";
import { StoreValue } from "antd/es/form/interface";

interface AddAuctionProps {
  title: string;
}

const DateRange = ({ title = "" }: AddAuctionProps) => {
  // Validate start date (should be after current date)
  const validateStartDate = (_: RuleObject, value: StoreValue) => {
    const selectedStartDate = value;
    const currentDate = dayjs(); // Get the current date using dayjs

    if (!selectedStartDate || dayjs(selectedStartDate).isAfter(currentDate)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Please choose a start date that is greater than the current date")
    );
  };

  return (
    <>
      <Form.Item
        label={`${title} Start Date`}
        name="startTime"
        rules={[
          { required: true, message: "Please select a start date!" },
          { validator: validateStartDate },
        ]}
      >
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder="Select start date"
          className="!w-full"
        />
      </Form.Item>
      <Form.Item
        label={`${title} End Date`}
        name="endTime"
        dependencies={["startTime"]}
        rules={[
          { required: true, message: "Please select an end date!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const startTime = getFieldValue("startTime");
              if (!value || !startTime || dayjs(value).isAfter(dayjs(startTime))) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please choose an end date that is after the start date")
              );
            },
          }),
        ]}
      >
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          placeholder="Select end date"
          className="!w-full"
        />
      </Form.Item>
    </>
  );
};

export default DateRange;
