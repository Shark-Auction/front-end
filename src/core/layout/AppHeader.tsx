import { Avatar, Button, Dropdown, Image, MenuProps } from "antd";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../components/UI/underline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/slice/userSlice";

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.user);
  const itemsLink = [
    {
      title: "Đấu giá",
      link: "/u/auction",
    },
    {
      title: "Blog",
      link: "/",
    },
  ];
  const items: MenuProps["items"] = itemsLink.map((e) => ({
    label: <Link to={e.link}>{e.title}</Link>,
    key: e.title,
  }));
  const handleLogout = () => {
    dispatch(logout());
    navigate("/u/home");
  };
  const itemsUser: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/u/profile"}>Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];
  return (
    <div className="relative w-full md:px-[10%] flex justify-between">
      <div className="flex items-center gap-10 md:w-2/3">
        <Image
          preview={false}
          className="!relative !w-[50px] md:!w-[70px] !object-contain"
          src="/src/assets/logo_exe.png"
          alt="logo"
        />
        <p
          onClick={() => navigate("/u/home")}
          className="hidden md:block md:text-3xl cursor-pointer"
        >
          <strong>Shark Auction</strong>
        </p>
      </div>
      {/*Desktop */}
      <div className="hidden md:flex justify-between items-center md:w-fit gap-10">
        {itemsLink.map((element) => (
          <Link
            key={element.title}
            to={element.link}
            className="md:text-xl relative group hover:text-black"
          >
            {element.title}
            <Underline />
          </Link>
        ))}
        {userLogin ? (
          <Dropdown
            menu={{ items: itemsUser }}
            placement="bottomLeft"
            arrow
            trigger={["click"]}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2 border border-gray-500 py-2 px-5 rounded-lg">
              <Avatar className="!w-10 !h-10" />
              <p className="text-sm font-bold">{userLogin["fullName"]}</p>{" "}
            </div>
          </Dropdown>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="px-5 shadow-lg"
          >
            <p className="md:text-xl hover:text-inherit">Đăng nhập</p>
          </Button>
        )}
      </div>
      {/*Mobile */}
      <div className="md:hidden flex items-center gap-5">
        {userLogin ? (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="active:text-black"
            overlayClassName="w-[150px]"
          >
            <IoMenuSharp className="text-3xl" />
          </Dropdown>
        ) : (
          <Link to={"/auth/login"} className="hover:text-black text-xl">
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
