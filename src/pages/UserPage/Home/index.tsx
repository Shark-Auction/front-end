import { Skeleton } from "antd";
import CardElement from "../../../components/Card";
import Carousel from "../../../components/Carousel";
import { CardCategory } from "./components/CardCategory";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Underline from "../../../components/UI/underline";
import { categoryApi } from "../../../service/api/categoryApi";
import { Category } from "../../../model/category";
import EmptyComponent from "../../../components/Empty";
import { auctionApi } from "../../../service/api/auctionApi";
import { Auction } from "../../../model/auction";
import { statusAuction } from "../../../utils/render/statusRender";

const HomePage = () => {
  const [dataProduct, setDataProduct] = useState<Auction[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [pageSize, setPageSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getCategory();
      const filterParent = response.data.filter(
        (item: Category) => item.parent === null
      );
      setCategory(filterParent);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await auctionApi.getAuction();
      const filteredData = response.data
        .filter(
          (e: Auction) => e.status === "Waiting" || e.status === "InProgress"
        )
        .sort(
          (a: Auction, b: Auction) =>
            new Date(b?.startTime).getTime() - new Date(a?.startTime).getTime()
        );
      setDataProduct(filteredData);
    } catch (error: any) {
      toast.error(error);
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
    fetchCategory();
  }, []);

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
        <Skeleton loading={loading}>
          <div className="">
            <p className="text-2xl text-gray-500 px-5">Danh mục</p>
          </div>
          {category.length !== 0 ? (
            <div>
              <Carousel
                type="Category"
                numberOfSlide={1}
                data={category}
                component={(item: Category) => (
                  <CardCategory icon={item.imageUrl} name={item.name} />
                )}
              />
            </div>
          ) : (
            <EmptyComponent />
          )}
        </Skeleton>
      </div>
      <div className="border-b-4 shadow-shadowLight flex justify-center py-2 border-b-primaryColor">
        <p className="text-2xl text-primaryColor">Đề xuất</p>
      </div>
      <Skeleton loading={loading}>
        {dataProduct.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {dataProduct.slice(0, pageSize).map((element) => (
                <CardElement
                  image={element.product.thumbnail}
                  id={element.id}
                  name={element.product.name}
                  remainDay={element.endTime}
                  currentPrice={element.currentPrice}
                  status={statusAuction[element.status]()}
                  onClick={() => navigate(`/u/auction/${element.id}`)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                to={"/u/auction"}
                className="text-xl text-primaryColor relative group"
              >
                Xem thêm <Underline color="primaryColor" />
              </Link>
            </div>
          </>
        ) : (
          <EmptyComponent />
        )}
      </Skeleton>
    </div>
  );
};

export default HomePage;
