import { Layout } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { Outlet, useNavigate } from "react-router-dom";
import AppFooter from "./AppFooter";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const userLogin = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userLogin && userLogin["roleName"] === "admin") {
      navigate("/admin");
    }
  }, [navigate, userLogin]);

  useEffect(() => {
    const headerElement = document.querySelector(".ant-layout-header");
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight);
    }
  }, []);
  return (
    <Layout className="min-h-screen">
      <Header
        className="fixed w-full z-[10] text-black flex items-center 
      bg-gradient-header md:h-fit md:rounded-es-md md:rounded-ee-md shadow-xl"
      >
        <AppHeader />
      </Header>
      <Content style={{ marginTop: headerHeight }}>
        <Outlet />
      </Content>
      <Footer className="!w-full">
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
