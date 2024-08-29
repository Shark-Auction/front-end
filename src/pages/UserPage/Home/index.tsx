import { Skeleton } from "antd";
import CardElement from "../../../components/Card";
import Carousel from "../../../components/Carousel";
import { CardCategory } from "./components/CardCategory";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../../components/UI/underline";

interface ProductProps {
  id: string;
  remainDay: string;
  name: string;
  currentPrice: string;
  status: string;
  image: string;
}

const HomePage = () => {
  const [dataProduct, setDataProduct] = useState<ProductProps[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [pageSize, setPageSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const data = new Array(20).fill(null).map((_, index) => ({
    icon: "/src/assets/logo_exe.png",
    name: `Category ${index + 1}`,
  }));

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://65335392d80bd20280f6684e.mockapi.io/api/v1/Product"
      );
      setDataProduct(response.data);
    } catch (error: any) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageSize]);

  useEffect(() => {
    setPageSize(isMobile ? 10 : 20);
  }, [isMobile]);

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full h-[500px] hidden md:block shadow-shadowLight">
        <img
          className="w-full h-full object-cover"
          src="/src/assets/background_home.jpeg"
        />
      </div>
      <div className="border shadow-shadowLight flex flex-col gap-5 pt-5 ">
        <div className="">
          <p className="text-2xl text-gray-500 px-5">Category</p>
        </div>
        <div>
          <Carousel
            type="Category"
            numberOfSlide={1}
            data={data}
            component={(item: any) => (
              <CardCategory icon={item.icon} name={item.name} />
            )}
          />
        </div>
      </div>
      <div className="border-b-4 shadow-shadowLight flex justify-center py-2 border-b-primaryColor">
        <p className="text-2xl text-primaryColor">Suggested Product</p>
      </div>
      <Skeleton loading={loading}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {dataProduct.map((element) => (
            <CardElement
              image={element.image}
              id={element.id}
              name={element.name}
              remainDay={element.remainDay}
              currentPrice={element.currentPrice}
              status={element.status}
              onClick={() => navigate(`/u/auction/${element.id}`)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to={"/u/auction"}
            className="text-xl text-primaryColor relative group"
          >
            More Auction <Underline color="primaryColor" />
          </Link>
        </div>
      </Skeleton>
    </div>
  );
};

export default HomePage;
