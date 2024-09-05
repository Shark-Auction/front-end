import Table, { ColumnProps, TableProps } from "antd/es/table"
import { toast } from "react-toastify";
import api from "../../config/axios/api";
import { useEffect, useState } from "react";

export interface ColumnsTable extends ColumnProps{
  title: string;
  dataIndex: string;
  key: string;
}

interface TableComponentProps extends Omit<TableProps<any>, 'columns' | 'dataSource'> {
  columns: ColumnsTable[];
  apiUri: string;
}

const TableComponent = ({columns, apiUri, ...rest}: TableComponentProps) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await api.get(`${apiUri}`)
      setDataSource(response.data)
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Table columns={columns} dataSource={dataSource} loading={loading} {...rest}/>
  )
}

export default TableComponent