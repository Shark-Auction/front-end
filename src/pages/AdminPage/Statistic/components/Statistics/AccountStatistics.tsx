import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { toast } from "react-toastify";
import { accountApi } from "../../../../../service/api/admin/accountAPI";

interface ValueStyleProps {
  valuesStyle: any;
}

const AccountStatistics = ({valuesStyle}: ValueStyleProps) => {
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
  return (
    <Statistic
      loading={loading}
      title="Account"
      value={data && data.length}
      prefix={<MdGroups />}
      valueStyle={valuesStyle}
    />
  );
};

export default AccountStatistics;
