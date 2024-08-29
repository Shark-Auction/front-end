import { Pagination, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardElement from "../../../../../components/Card";
import { useNavigate } from "react-router-dom";
import api from "../../../../../config/axios/api";
interface ProductProps {
  id: string;
  remainDay: string;
  name: string;
  currentPrice: string;
  status: string;
  image: string;
}
export const AuctionList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataProduct, setDataProduct] = useState<ProductProps[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const paginatedData: ProductProps[] = dataProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("Product");
      setDataProduct(response.data);
      setTotalItems(response.data.length);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (id: any) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <Skeleton loading={loading}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {paginatedData.map((element) => (
            <CardElement
              key={element.id}
              image={element.image}
              id={element.id}
              name={element.name}
              remainDay={element.remainDay}
              currentPrice={element.currentPrice}
              status={element.status}
              onClick={() => handleDetail(element.id)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={onPageChange}
          />
        </div>
      </Skeleton>
    </div>
  );
};
