import React, { useState } from "react";
import TableComponent, {
  ColumnsTable,
} from "../../../../../../../components/Table";

const MyWinning = () => {
  const [render, setRender] = useState(false);
  const column: ColumnsTable[] = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <TableComponent
      render={render}
      setRender={setRender}
      columns={column}
      apiUri="auction/win"
    />
  );
};

export default MyWinning;
