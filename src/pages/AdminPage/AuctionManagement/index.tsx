import { Form, Image, Input } from "antd";
import React from "react";
import Dashboard, { Column } from "../../../components/Dashboard";

const AuctionManagement = () => {
  const column: Column[] = [
    {
      title: "#",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Remain Day",
      key: "remainDay",
      dataIndex: "remainDay",
    },
    {
      title: "currentPrice",
      key: "currentPrice",
      dataIndex: "currentPrice",
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (data) => <Image width={200} src={data} />,
    },
  ];
  const formItem = (
    <>
      <Form.Item label={"Name"} name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Remain Day"} name={"remainDay"}>
        <Input />
      </Form.Item>
      <Form.Item label="Current Price" name={"currentPrice"}>
        <Input />
      </Form.Item>
      <Form.Item label="Status" name={"status"}>
        <Input />
      </Form.Item>
      <Form.Item label="Image" name={"image"}>
        <Input />
      </Form.Item>
      <Form.Item name={"id"} hidden></Form.Item>
    </>
  );
  return <Dashboard columns={column} formItem={formItem} apiUri={"auction"} />;
};

export default AuctionManagement;
