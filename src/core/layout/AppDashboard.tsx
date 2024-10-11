import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory, MdDashboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { TfiStatsUp } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/userSlice";
import { RootState } from "../store/store";

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
  {
    key: '',
    label: 'Dashboard',
    icon: <MdDashboard />,
    children: [
      getItem("Statistics", "statistic", <TfiStatsUp />),
    ],
  },
  {
    key: 'menu',
    label: 'Account Management',
    icon: <MdCategory />,
    children: [
      getItem("All User", "account-management", <MdCategory />),
      getItem("Staff", "staff-management", <MdCategory />),
      getItem("Manager", "manager-management", <MdCategory />),

    ],
  },
  getItem("Category Management", "category-management", <MdCategory />),
  getItem("Auction Management", "auction-management", <AiFillProduct />),
  getItem("Brand Management", "brand-management", <AiFillProduct />),
  getItem("Origin Management", "origin-management", <AiFillProduct />),
  getItem("Product Management", "product-management", <AiFillProduct />),
  getItem("Blog Management", "blog-management", <AiFillProduct />),
  getItem("Violate Management", "violate-management", <AiFillProduct />),
  getItem("voucher Management", "voucher-management", <AiFillProduct />),
];

const AppDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogin = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  const itemsUser: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/u/profile"}>Thông tin</Link>,
    },
    {
      key: "2",
      label: <div onClick={handleLogin}>Đăng xuất</div>,
    },
  ];
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
            {userLogin && (
              <Dropdown
                menu={{ items: itemsUser }}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
              >
                <div className="flex items-center gap-2 border border-gray-400 py-1 px-5 rounded-lg">
                  <Avatar size={"large"} />
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">
                      <span>{userLogin["fullName"]}</span>
                      <br />
                      <span className="font-normal text-gray-500">{userLogin["roleName"]}</span>
                    </p>
                  </div>
                </div>
              </Dropdown>
            )}
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
