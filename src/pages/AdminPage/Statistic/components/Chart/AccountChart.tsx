import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { accountApi } from "../../../../../service/api/admin/accountAPI";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Spin } from "antd";

const AccountChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await accountApi.getAccount();
        setData(response.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGroupedDataByRole = () => {
    const roleCounts: { [role: string]: number } = {};

    data.forEach((account) => {
      const roleName = account.role_id.name;
      if (roleCounts[roleName]) {
        roleCounts[roleName]++;
      } else {
        roleCounts[roleName] = 1;
      }
    });

    return Object.keys(roleCounts).map((role) => ({
      name: role,
      value: roleCounts[role],
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <div className="col-span-1 !h-full">
      {loading ? (
        <Spin />
      ) : (
        <Card
          title={
            <div className="flex flex-col py-5 items-center">
              <div className="flex justify-between">
                <p>Account Chart</p>
              </div>
            </div>
          }
          className="shadow-shadowLight !h-full"
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getGroupedDataByRole()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {getGroupedDataByRole().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};

export default AccountChart;
