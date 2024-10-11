import { Card, Select, Spin } from "antd"; // Ant Design Select and Spin (for loading)
import dayjs from "dayjs"; // For date parsing
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { orderApi } from "../../../../../service/api/orderApi";

const { Option } = Select;

const OrderBarChart = () => {
  const [data, setData] = useState<any[]>([]); // Raw order data
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Set current year as default
  const [years, setYears] = useState<number[]>([]); // Store available years

  // Fetch order data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getAllOrder();
        setData(response.data);
        extractYears(response.data); // Extract available years from data
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract available years from the data
  const extractYears = (orders: any[]) => {
    const orderYears = orders.map((order) => dayjs(order.createdAt).year());
    const uniqueYears = Array.from(new Set(orderYears)); // Get unique years
    setYears(uniqueYears);
  };

  // Group orders by month for the selected year
  const getDataForYear = (year: number) => {
    const monthlyOrderCounts = Array(12).fill(0); // Initialize an array for each month

    data.forEach((order) => {
      const orderYear = dayjs(order.createdAt).year();
      if (orderYear === year) {
        const month = dayjs(order.createdAt).month(); // Month is 0-indexed (0 = January, 11 = December)
        monthlyOrderCounts[month]++; // Increment order count for that month
      }
    });

    // Format data for Recharts (e.g., [{ month: 'Jan', count: 5 }, ...])
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, index) => ({
      month,
      count: monthlyOrderCounts[index],
    }));
  };

  // Handle year change in the select dropdown
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <Card
      title={
        <div className="flex flex-col">
          <div className="flex justify-between py-5 items-center">
            <p>Order Chart</p>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              style={{ width: 120 }}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
          <p>Total orders: {data.length}</p>
        </div>
      }
      loading={loading}
      className="w-full col-span-2 shadow-shadowLight h-full"
    >
      {loading ? (
        <Spin />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={getDataForYear(selectedYear)} // Data for the selected year
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default OrderBarChart;
