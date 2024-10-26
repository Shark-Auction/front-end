import { Button, Card, DatePicker, Statistic } from "antd";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Revenue } from "../../../model/revenue";
import { revenueApi } from "../../../service/api/admin/revenue";
import AccountChart from "./components/Chart/AccountChart";
import OrderBarChart from "./components/Chart/OrderChart";
import TransactionChart from "./components/Chart/TransactionsChart";
import AccountStatistics from "./components/Statistics/AccountStatistics";
import AuctionStatistics from "./components/Statistics/AuctionStatistics";
import DeliveryStatistics from "./components/Statistics/DeliveryStatistics";
import OrderStatistics from "./components/Statistics/OrderStatistics";
import ProductStatistics from "./components/Statistics/ProductStatistics";
import RatingStatistics from "./components/Statistics/RatingStatistics";
const { RangePicker } = DatePicker;

const StatisticManagement = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Revenue>();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const valuesStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 25,
  };
  const fetchData = async (startDate = "", endDate = "") => {
    try {
      setLoading(true);
      const response = await revenueApi.getRevenue(startDate, endDate);
      setData(response);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
    setDateRange(dates);
    if (dates) {
      const [start, end] = dates;
      fetchData(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
    } else {
      fetchData();
    }
  };
  const clearDateRange = () => {
    setDateRange(null);
    fetchData();
  };
  return (
    <div className="flex flex-col gap-5">
      <Card className="shadow-shadowLight">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">
              Select date range for sort revenue:{" "}
            </p>
            <div className="flex gap-5">
              <RangePicker
                className="w-1/2"
                value={dateRange}
                onChange={handleDateChange as any}
                format="YYYY-MM-DD"
              />
                <Button
                  className="font-bold"
                  danger
                  onClick={clearDateRange}
                >
                  Clear
                </Button>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <Statistic
              title={"Total revenue"}
              value={data?.totalRevenue}
              loading={loading}
              suffix={"VND"}
              valueStyle={{ color: "orange" }}
            />
            <Statistic
              title={"Total order"}
              value={data?.receivedOrders}
              loading={loading}
            />
            <Statistic
              title={"Order today"}
              value={data?.ordersToday}
              loading={loading}
            />
            <Statistic
              title={"Revenue by date range"}
              value={data?.revenueByDateRange}
              loading={loading}
              suffix={"VND"}
              valueStyle={{ color: "orange" }}
            />
          </div>
        </div>
      </Card>
      <Card className="shadow-shadowLight">
        <div className="grid grid-cols-6">
          <RatingStatistics valuesStyle={valuesStyle} />
          <ProductStatistics valuesStyle={valuesStyle} />
          <AuctionStatistics valuesStyle={valuesStyle} />
          <AccountStatistics valuesStyle={valuesStyle} />
          <DeliveryStatistics valuesStyle={valuesStyle} />
          <OrderStatistics valuesStyle={valuesStyle} />
        </div>
      </Card>
      <div className="mt-5">
        <TransactionChart />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <AccountChart />
        <OrderBarChart />
      </div>
    </div>
  );
};

export default StatisticManagement;
