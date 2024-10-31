import {
  Avatar,
  Button,
  Divider,
  Drawer,
  FloatButton,
  Menu,
  MenuProps,
} from "antd";
import { FaListAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../../core/store/store";
import { useEffect, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
type MenuItem = Required<MenuProps>["items"][number];

const UserProfile = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>(localStorage.getItem("key") || "");
  const loginnedUser = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const navigateEdit = () => {
    localStorage.setItem("key", "");
    setKey("")
    setOpen(false);
    navigate('/u/profile')
  }
  const itemsMenu: MenuItem[] = [
    {
      key: "",
      icon: <FaUserLarge className="!text-base" />,
      label: "Thông tin của tôi",
    },
    {
      key: "change-password",
      icon: <MdEdit className="!text-base" />,
      label: "Đổi mật khẩu",
    },
    {
      key: "your-management",
      icon: <FaListAlt className="!text-base" />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "order-management",
      icon: <FaListAlt className="!text-base" />,
      label: "Quản lý đơn",
    },
    {
      key: "request-product",
      icon: <IoMdAdd className="!text-base" />,
      label: "Yêu cầu sản phẩm",
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    localStorage.setItem("key", e.key);
    setKey(e.key);
    setOpen(false);
    navigate(`/u/profile/${e.key}`);
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem("key");
    };
  }, []);
  return (
    <div className="flex flex-col md:flex-row gap-10 p-5 md:p-0">
      <div className="hidden md:block md:w-1/4 border rounded-md shadow-shadowLight py-5 px-3 bg-white !h-fit md:sticky top-32">
        <div className="flex items-center gap-2">
          <Avatar className="w-20 h-20" />
          <div className="flex flex-col flex-grow">
            <p className="text-base">
              <strong>{loginnedUser ? loginnedUser["fullName"] : "NaN"}</strong>
            </p>
            <Button
              onClick={navigateEdit}
              type="link"
              className="!p-0 !text-left flex justify-start !w-fit"
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
        <Divider className="border-gray-200" />
        <Menu
          className="!border-none !text-base"
          onClick={onClick}
          defaultSelectedKeys={[key]}
          mode="inline"
          items={itemsMenu}
        />
      </div>
      <FloatButton
        onClick={showDrawer}
        className="block md:hidden"
        type="primary"
        icon={<IoReorderThreeOutline />}
      />
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        width={"75%"}
        className="!p-0"
      >
        <div className="flex items-center gap-2">
          <Avatar className="w-20 h-20" />
          <div className="flex flex-col flex-grow">
            <p className="text-base">
              <strong>{loginnedUser ? loginnedUser["fullName"] : "NaN"}</strong>
            </p>
            <Button
              onClick={navigateEdit}
              type="link"
              className="!p-0 !text-left flex justify-start !w-fit"
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
        <Divider className="border-gray-200" />
        <Menu
          className="!border-none !text-base"
          onClick={onClick}
          defaultSelectedKeys={[key]}
          mode="inline"
          items={itemsMenu}
        />
      </Drawer>
      <div className="w-full md:w-3/4 border rounded-md shadow-shadowLight p-5 !bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
