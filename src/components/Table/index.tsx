import Table, { ColumnProps, TableProps } from "antd/es/table";
import { toast } from "react-toastify";
import api from "../../config/axios/api";
import { useEffect, useState } from "react";

export interface ColumnsTable extends ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
}

interface TableComponentProps
  extends Omit<TableProps<any>, "columns" | "dataSource"> {
  columns: ColumnsTable[];
  apiUri: string;
  expandX?: number | string,
  render?: boolean;
  setRender?: any;
}

const TableComponent = ({ columns, apiUri, expandX = 'default',render = false, setRender, ...rest }: TableComponentProps) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${apiUri}`);
        console.log(response?.data?.data)
        setDataSource(response?.data?.data === undefined ? response?.data : response?.data?.data);
      } catch (error: any) {
        toast.error(error?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if(render) {
      fetchData();
      setRender(false)
    }
  }, [apiUri, render, setRender]);
  return (
    <Table
      scroll={{ x: expandX }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      {...rest}
    />
  );
};

export default TableComponent;
