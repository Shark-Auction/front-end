import { Card, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { transactionApi } from "../../../../../service/api/transactionApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { formatVND } from "../../../../../utils/format";

const TransactionChart = () => {
  const [dataTransaction, setDataTransaction] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await transactionApi.getAllTransaction();
        const transactions = response.data;
        setDataTransaction(transactions);
        extractYears(transactions);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const extractYears = (transactions: any[]) => {
    const uniqueYears = Array.from(
      new Set(transactions.map((tx) => dayjs(tx.createdAt).year()))
    );
    setYears(uniqueYears);
  };

  const getMonthlyRevenueData = (year: number) => {
    const monthlyData = Array(12).fill({ revenue: 0 });

    dataTransaction.forEach((transaction) => {
      const transactionDate = dayjs(transaction.createdAt);
      if (transactionDate.year() === year) {
        const monthIndex = transactionDate.month();
        const revenue = transaction.money;
        monthlyData[monthIndex] = {
          month: transactionDate.format("MMMM"),
          transaction: (monthlyData[monthIndex].revenue || 0) + revenue,
        };
      }
    });

    return monthlyData.map((data, index) => ({
      month: dayjs().month(index).format("MMMM"),
      Transaction: data.transaction || 0,
    }));
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <Card
      title={
        <div className="flex flex-col py-5">
          <div className="flex justify-between">
            <p>Transaction Chart</p>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              style={{ width: 120 }}
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <p>
              Total transaction money:{" "}
              <span className="text-orange-600 !font-black">
                {formatVND(
                  dataTransaction.reduce(
                    (element, transaction) => element + transaction.money,
                    0
                  )
                )}
              </span>
            </p>
          </div>
        </div>
      }
      className="shadow-shadowLight"
      loading={loading}
    >
      {loading ? (
        <Spin />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={getMonthlyRevenueData(selectedYear)}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatVND(value)} />
            <Tooltip
              formatter={(value: any) => formatVND(value)}
            />
            <Area
              type="monotone"
              dataKey="Transaction"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default TransactionChart;
