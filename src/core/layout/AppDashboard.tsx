import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { MdCategory, MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/admin/${key}`}>{label}</Link>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "", <MdDashboard />),
  getItem("Category Management", "category-management", <MdCategory />),
  getItem("Auction Management", "auction-management", <AiFillProduct />),
];

const AppDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="w-full h-full flex justify-end items-center gap-4">
            <Avatar className="w-12 h-12" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg"><strong>Username</strong></span>
              <span className="text-gray-400">Role</span>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppDashboard;
