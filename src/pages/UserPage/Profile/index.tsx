import { Avatar, Button, Divider, Menu, MenuProps } from "antd";
import { FaListAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../../core/store/store";
type MenuItem = Required<MenuProps>["items"][number];

const UserProfile = () => {
  const navigate = useNavigate();
  const loginnedUser = useSelector((state: RootState) => state.user)
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
    navigate(`/u/profile/${e.key}`);
  };
  return (
    <div className="flex md:flex-row gap-10">
      <div className="md:w-1/4 border rounded-md shadow-shadowLight py-5 px-3 bg-white !h-fit sticky top-32">
        <div className="flex items-center gap-2">
          <Avatar className="w-20 h-20" />
          <div className="flex flex-col flex-grow">
            <p className="text-base">
              <strong>{loginnedUser ? loginnedUser['fullName'] : "NaN"}</strong>
            </p>
            <Button type="link" className="!p-0 !text-left flex justify-start !w-fit">
              Edit information
            </Button>
          </div>
        </div>
        <Divider className="border-gray-200" />
        <Menu
          className="!border-none !text-base"
          onClick={onClick}
          defaultSelectedKeys={[""]}
          mode="inline"
          items={itemsMenu}
        />
      </div>
      <div className="md:w-3/4 border rounded-md shadow-shadowLight p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
