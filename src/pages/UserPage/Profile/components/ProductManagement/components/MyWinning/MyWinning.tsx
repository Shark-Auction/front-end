import React, { useState } from "react";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";
import { formatDateHour, formatVND } from "../../../../../../../utils/format";
import ImageComponent from "../../../../../../../components/Image";
import { getImageProduct } from "../../../../../../../utils/getImage";

const MyWinning = () => {
  const [render, setRender] = useState(false);
  const column: ColumnsTable[] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      fixed: 'left',
      width: 150,
      align: 'center'
    },
    {
      title: "Ảnh",
      dataIndex: "product",
      key: "image",
      render: (data) => (
        <ImageComponent src={getImageProduct(data.thumbnail)} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "product",
      key: "name",
      render: (data) => data.name,
    },
    {
      title: "Xuất xứ",
      dataIndex: "product",
      key: "name",
      render: (data) => data.origin.name,
    },
    {
      title: "Danh mục",
      dataIndex: "product",
      key: "name",
      render: (data) => data.category.name,
    },
    {
      title: "Hãng",
      dataIndex: "product",
      key: "name",
      render: (data) => data.brand.name,
    },
    {
      title: "Giá chót",
      dataIndex: "product",
      key: "finalPrice",
      render: (data) => (
        <p className="font-bold text-base text-orange-600">
          {formatVND(data.finalPrice)}
        </p>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (data) => formatDateHour(data),
    },
  ];
  return (
    <TableComponent
      expandX={1700}
      render={render}
      setRender={setRender}
      columns={column}
      apiUri="auction/win"
    />
  );
};

export default MyWinning;
