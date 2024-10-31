import { Button, Image } from "antd";
import { CgMail } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import { getImageFE } from "../../utils/getImage";
import TitleLayout from "./components/TitleLayout";

const AppFooter = () => {
  const address = "FPT University HCM, Vietnam";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  const itemsAboutUs = [
    {
      link: "/about",
      title: "Về chúng tôi",
    },
    {
      link: "/u/blog",
      title: "Blog",
    },
  ];

  const itemsSupport = [
    {
      link: "/faq",
      title: "FAQ",
    },
    {
      link: "/services",
      title: "Dịch vụ",
    },
  ];

  const itemsContact = [
    {
      link: "/contact",
      title: "Cộng tác",
    },
  ];

  return (
    <div className="bg-gradient-primary py-5">
      <div className="flex flex-col gap-5 container mx-auto md:flex-row md:justify-between">
        <div className="md:w-[100%/3] flex flex-col gap-5">
          <div className="flex gap-10 items-center">
            <Image
              preview={false}
              className="!relative !w-10 md:!w-20 !object-cover rounded-full p-2 bg-white shadow-shadowLight"
              src={getImageFE("logo_exe.png")}
              alt="logo"
            />
            <TitleLayout className="text-3xl">
              <strong>Shark Auction</strong>
            </TitleLayout>
          </div>
          <div className="flex items-center gap-5 text-lg"></div>
          <div className="flex items-center gap-5 text-lg">
            <div className="border-2 border-white rounded-full p-1 text-white drop-shadow-2xl">
              <MdPlace />
            </div>
            <TitleLayout
              className="cursor-pointer"
              onClick={() => {
                window.open(googleMapsUrl);
              }}
            >
              {address}
            </TitleLayout>
          </div>
          <div className="flex items-center gap-5 text-lg">
            <div className="border-2 border-white rounded-full p-1 text-white drop-shadow-2xl">
              <CgMail />
            </div>
            <TitleLayout>sharkauctioncompany@gmail.com</TitleLayout>
          </div>
        </div>

        <div className="md:w-[100%/3] grid grid-cols-2 md:flex md:justify-between text-lg gap-10">
          <div className="flex flex-col gap-2">
            <TitleLayout className="font-semibold text-2xl">
              VỀ CHÚNG TÔI
            </TitleLayout>
            <div className="flex flex-col gap-2">
              {itemsAboutUs.map((e) => (
                <Link key={e.link} to={e.link} className="!w-fit">
                  <TitleLayout>{e.title}</TitleLayout>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <TitleLayout className="font-semibold text-2xl">HỖ TRỢ</TitleLayout>
            <div className="flex flex-col gap-2">
              {itemsSupport.map((e) => (
                <Link
                  key={e.link}
                  to={e.link}
                  className="hover:text-black !w-fit"
                >
                  <TitleLayout>{e.title}</TitleLayout>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <TitleLayout className="font-semibold text-2xl">
              CỘNG TÁC
            </TitleLayout>
            <div className="flex flex-col gap-2">
              {itemsContact.map((e) => (
                <Link
                  key={e.link}
                  to={e.link}
                  className="hover:text-black !w-fit"
                >
                  <TitleLayout>{e.title}</TitleLayout>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-[100%/3] flex flex-col md:items-center gap-5">
          <TitleLayout className="font-semibold text-2xl text-center">THEO DÕI TẠI</TitleLayout>
          <Button
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61565524593071"
              )
            }
            className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-blue-500 hover:!bg-blue-500"
          >
            <FaFacebook className="text-3xl w-[30%] text-white" />
            <p className="text-xl w-[70%] text-left text-white">Facebook</p>
          </Button>
          <Button className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:!bg-gradient-to-r">
            <FaInstagram className="text-3xl text-white w-[30%]" />
            <p className="text-xl w-[70%] text-left text-white">Instagram</p>
          </Button>
          <Button
            onClick={() =>
              window.open(
                "https://www.tiktok.com/@sharkauction2024?fbclid=IwY2xjawFnjolleHRuA2FlbQIxMAABHbPRm7FaC8HP5f79f_Dfr2jg-8GxEvrE2XS6PTmyehiGV93nLM5Gy__g_Q_aem_VLSZUTllE-YXZlliWUBdOA"
              )
            }
            className="md:w-[250px] px-16 py-6 shadow-lg rounded-3xl justify-center flex !border-none bg-black hover:!bg-black"
          >
            <FaTiktok className="text-3xl w-[30%] text-white" />
            <p className="text-xl w-[70%] text-left text-white">Tiktok</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
