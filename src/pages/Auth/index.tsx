import { Image, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <Layout className="min-h-screen">
      <Header
        className="w-full z-[10] text-black flex items-center 
      bg-gradient-header md:h-fit md:rounded-es-md md:rounded-ee-md shadow-xl"
      >
        <div className="relative w-full py-3 md:container md:mx-auto">
          <div className="flex items-center gap-10">
            <Image
              preview={false}
              className="!relative !w-10 md:!w-20 !object-cover rounded-full p-2 bg-white shadow-shadowLight"
              src="/src/assets/logo_exe.png"
              alt="logo"
            />
            <p
              onClick={() => navigate("/")}
              className="hidden md:block md:text-3xl cursor-pointer 
          text-white drop-shadow-xl"
            >
              <strong>Shark Auction</strong>
            </p>
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
