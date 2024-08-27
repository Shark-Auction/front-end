import { Button, Image } from "antd";
import { CgMail } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AppFooter = () => {
  const address = "FPT University HCM, Vietnam";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  const itemsAboutUs = [
    {
      link: "/about",
      title: "About Us",
    },
    {
      link: "/blog",
      title: "Blog",
    },
  ];

  const itemsSupport = [
    {
      link: "/faq",
      title: "FAQ",
    },
    {
      link: "/qna",
      title: "QnA",
    },
    {
      link: "/services",
      title: "Services",
    },
  ];

  const itemsContact = [
    {
      link: "/contact",
      title: "Contact",
    },
  ];

  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between md:px-[10%]">
      <div className="md:w-[100%/3] flex flex-col gap-5">
        <div className="flex gap-10 items-center">
          <Image
            preview={false}
            className="!relative !w-[70px] !object-contain"
            src="src/assets/logo_exe.png"
            alt="logo"
          />
          <p className="text-3xl">
            <strong>Shark Auction</strong>
          </p>
        </div>
        <div className="flex items-center gap-5 text-lg">
          <div className="border-2 border-black rounded-full p-1">
            <RiPhoneFill />
          </div>
          <p>+0123456789</p>
        </div>
        <div className="flex items-center gap-5 text-lg">
          <div className="border-2 border-black rounded-full p-1">
            <MdPlace />
          </div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            {address}
          </a>
        </div>
        <div className="flex items-center gap-5 text-lg">
          <div className="border-2 border-black rounded-full p-1">
            <CgMail />
          </div>
          <p>sharkauction@gmail.com</p>
        </div>
      </div>

      <div className="md:w-[100%/3] grid grid-cols-2 md:flex md:justify-between text-lg gap-10">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl">ABOUT US</p>
          <div className="flex flex-col gap-2">
            {itemsAboutUs.map((e) => (
              <Link to={e.link} className="hover:text-black">
                {e.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl">SUPPORT</p>
          <div className="flex flex-col gap-2">
            {itemsSupport.map((e) => (
              <Link to={e.link} className="hover:text-black">
                {e.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl">CONTACT</p>
          <div className="flex flex-col gap-2">
            {itemsContact.map((e) => (
              <Link to={e.link} className="hover:text-black">
                {e.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-[100%/3] flex flex-col md:items-center gap-5">
        <p className="font-semibold text-2xl text-center">FOLLOW US</p>
        <Button className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-blue-500">
          <FaFacebook className="text-3xl w-[30%] text-white" />
          <p className="text-xl w-[70%] text-left text-white">Facebook</p>
        </Button>
        <Button className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-gradient-to-r from-purple-500 to-pink-500">
          <FaInstagram className="text-3xl text-white w-[30%]" />
          <p className="text-xl w-[70%] text-left text-white">Instagram</p>
        </Button>
        <Button className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-black">
          <FaTiktok className="text-3xl w-[30%] text-white" />
          <p className="text-xl w-[70%] text-left text-white">Tiktok</p>
        </Button>
      </div>
    </div>
  );
};

export default AppFooter;
