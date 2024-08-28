import { Button, Dropdown, Image, MenuProps } from "antd";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../components/UI/underline";

const AppHeader = () => {
  const navigate = useNavigate()
  const itemsLink = [
    {
      title: "Auction",
      link: "/u/auction",
    },
    {
      title: "Category",
      link: "/",
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

  return (
    <div className="relative w-full md:px-[10%] flex justify-between">
      <div className="flex items-center gap-10">
        <Image
          preview={false}
          className="!relative !w-[50px] md:!w-[70px] !object-contain"
          src="/src/assets/logo_exe.png"
          alt="logo"
        />
        <p onClick={() => navigate('/u/home')} className="hidden md:block md:text-3xl cursor-pointer">
          <strong>Shark Auction</strong>
        </p>
      </div>
      {/*Desktop */}
      <div className="hidden md:flex justify-between items-center md:w-[400px]">
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
        <Button onClick={() => navigate('/auth/login')} className="px-5 shadow-lg">
          <p className="md:text-xl hover:text-inherit">Login</p>
        </Button>
      </div>
      {/*Mobile */}
      <div className="md:hidden flex items-center gap-5">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="active:text-black"
          overlayClassName="w-[150px]"
        >
          <IoMenuSharp className="text-3xl" />
        </Dropdown>
        <Link to={"/auth/login"} className="hover:text-black text-xl">
          Login
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
