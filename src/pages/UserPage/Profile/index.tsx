import { Avatar, Button, Divider, Menu, MenuProps } from "antd";
import { FaListAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const UserProfile = () => {
  const navigate = useNavigate();
  const itemsMenu: MenuItem[] = [
    {
      key: "",
      icon: <FaUserLarge className="!text-base" />,
      label: "My profile",
    },
    {
      key: "change-password",
      icon: <MdEdit className="!text-base" />,
      label: "Change password",
    },
    {
      key: "your-management",
      icon: <FaListAlt className="!text-base" />,
      label: "Product management",
    },
    {
      key: "order-management",
      icon: <FaListAlt className="!text-base" />,
      label: "Order management",
    },
    {
      key: "request-product",
      icon: <IoMdAdd className="!text-base" />,
      label: "Request product",
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
          <div className="flex flex-col">
            <p className="text-base">
              <strong>Username</strong>
            </p>
            <Button type="link" className="!p-0">
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
