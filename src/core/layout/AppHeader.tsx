import { Button, Dropdown, Image, MenuProps } from "antd";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const underlineStyle = (
    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-black transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
  );
  const itemsLink = [
    {
      title: "Auction",
      link: "/",
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
          src="src/assets/logo_exe.png"
          alt="logo"
        />
        <p className="hidden md:block md:text-3xl">
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
            {underlineStyle}
          </Link>
        ))}
        <Button className="px-5 shadow-lg">
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
        <Link to={"/"} className="hover:text-black text-xl">
          Login
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
