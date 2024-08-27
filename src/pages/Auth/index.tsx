import { Image, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <Layout className="min-h-screen">
      <Header
        className="w-full z-[10] text-black flex items-center 
      bg-primaryColor md:h-[90px] shadow-xl"
      >
        <div className="relative w-full md:px-[10%] flex justify-between">
          <div className="flex items-center gap-10">
            <Image
              preview={false}
              className="!relative !w-[50px] md:!w-[70px] !object-contain"
              src="/src/assets/logo_exe.png"
              alt="logo"
            />
            <Link to={'/'} className="text-2xl md:text-3xl hover:!text-black">
              <strong>Shark Auction</strong>
            </Link>
          </div>
        </div>
      </Header>
      <Content className="flex-grow flex items-center justify-center md:bg-[url('/src/assets/backgroun_login.jpeg')]">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthPage;
