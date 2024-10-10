import { Layout } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { Outlet, useNavigate } from "react-router-dom";
import AppFooter from "./AppFooter";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { walletApi } from "../../service/api/walletApi";
import { setWalletUser } from "../store/slice/walletSlice";

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const userLogin = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
  useEffect(() => {
    const fetchWallet = async () => {
      const response = await walletApi.getMyWallet();
      const money: number =
        response.data !== undefined ? response.data.money : 0;
      dispatch(setWalletUser(money));
    };
    if (userLogin) {
      fetchWallet();
    }
  }, [dispatch, userLogin]);
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
