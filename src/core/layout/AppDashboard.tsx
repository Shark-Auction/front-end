import type { MenuProps } from "antd";
import { Dropdown, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { AiFillPieChart, AiFillProduct } from "react-icons/ai";
import {
  MdBrandingWatermark,
  MdCategory,
  MdGroups2,
  MdManageAccounts,
  MdNoAccounts,
  MdOutlineAccountCircle,

} from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { BiSolidDiscount } from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { RiAccountCircleFill, RiAuctionFill } from "react-icons/ri";
import { TfiStatsUp } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/userSlice";
import { RootState } from "../store/store";
import { MoneyCollectOutlined } from "@ant-design/icons";
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
    key: "",
    label: "Dashboard",
    icon: <AiFillPieChart size={20} />,
    children: [getItem("Statistics", "statistic", <TfiStatsUp size={20} />)],
  },
  {
    key: "menu",
    label: "Account Management",
    icon: <RiAccountCircleFill size={20} />,
    children: [
      getItem("All User", "account-management", <MdGroups2 size={20} />),
      getItem("Staff", "staff-management", <FaUserPen size={20} />),
      getItem("Manager", "manager-management", <MdManageAccounts size={20} />),
    ],
  },
  getItem(
    "Category Management",
    "category-management",
    <MdCategory size={20} />
  ),
  getItem(
    "Auction Management",
    "auction-management",
    <RiAuctionFill size={20} />
  ),
  getItem("Brand Management", "brand-management", <AiFillProduct size={20} />),
  getItem(
    "Origin Management",
    "origin-management",
    <MdBrandingWatermark size={20} />
  ),
  getItem(
    "Product Management",
    "product-management",
    <PiShoppingCartFill size={20} />
  ),
  getItem("Blog Management", "blog-management", <FaBlogger size={20} />),
  getItem(
    "Violate Management",
    "violate-management",
    <MdNoAccounts size={20} />
  ),
  getItem(
    "voucher Management",
    "voucher-management",
    <BiSolidDiscount size={20} />
  ),
  getItem(
    "Cashout Management",
    "cashout-management",
    <MoneyCollectOutlined />

  ),
];

const AppDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  const itemsUser: MenuProps["items"] = [
    {
      key: "infor",
      label: (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">
            {userLogin && userLogin["fullName"]}
          </p>
          <p className="font-normal text-gray-500 text-base">
            Role:{" "}
            <span className="text-blue-600">
              {userLogin && userLogin["roleName"]}
            </span>
          </p>
        </div>
      ),
    },
    {
      key: "Logout",
      label: (
        <div className="text-red-500 text-base">
          Logout
        </div>
      ),
      icon: <IoLogOutSharp className="text-red-500" size={20} />,
      onClick: handleLogout
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={270}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="!text-base"
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
                className="cursor-pointer hover:opacity-70 duration-300"
                overlayStyle={{ width: 200 }}
              >
                <MdOutlineAccountCircle size={40} />
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
