import { Layout } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerElement = document.querySelector(".ant-layout-header");
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight);
    }
  }, []);
  return (
    <Layout className="w-screen min-h-screen">
      <Header
        className="fixed w-full z-[10] text-black flex items-center 
      bg-primaryColor md:h-[90px] md:rounded-es-md md:rounded-ee-md shadow-xl" 
      >
        <AppHeader />
      </Header>
      <Content style={{ marginTop: headerHeight }} className="mx-auto container">
        <Outlet />
      </Content>
      <Footer className="!w-full">
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
