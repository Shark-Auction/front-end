import Table, { ColumnProps, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/axios/api";

export interface ColumnsTable extends ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
}

interface TableComponentProps
  extends Omit<TableProps<any>, "columns" | "dataSource"> {
  columns: ColumnsTable[];
  apiUri: string;
  expandX?: number | string;
  render?: boolean;
  setRender?: any;
  typeTable?: string;
}

const TableComponent = ({
  columns,
  apiUri,
  expandX = "default",
  render = false,
  setRender,
  ...rest
}: TableComponentProps) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${apiUri}`);
      setDataSource(
        response?.data?.data === undefined
          ? response?.data?.sort(
              (a: any, b: any) =>
                new Date(b?.createdAt).getTime() -
                new Date(a?.createdAt).getTime()
            )
          : response?.data?.data?.sort(
              (a: any, b: any) =>
                new Date(b?.product?.createdAt).getTime() -
                new Date(a?.product?.createdAt).getTime()
            )
      );
    } catch (error: any) {
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [apiUri]);
  
  useEffect(() => {
    if (render === true) {
      fetchData();
      setRender(false);
    }
    return () => {
      setDataSource([]);
    };
  }, [render, setRender]);

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
