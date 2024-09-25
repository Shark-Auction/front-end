import { useEffect, useState } from "react";
import { AuctionSellerModel } from "../../../../../model/seller";
import CardElement from "../../../../../components/Card";
import { statusAuction } from "../../../../../utils/render/statusRender";
import { useNavigate } from "react-router-dom";
import EmptyComponent from "../../../../../components/Empty";
import { Pagination } from "antd";

interface SellerAuctionProps {
  dataProduct: AuctionSellerModel[];
}

const SellerAuction = ({ dataProduct }: SellerAuctionProps) => {
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [totalItems, setTotalItems] = useState(0);
  const paginatedData: AuctionSellerModel[] = dataProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const onPageChange = (page: any) => {
    setCurrentPage(page);
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
    setPageSize(isMobile ? 10 : 20);
  }, [isMobile]);

  useEffect(() => {
    setTotalItems(dataProduct.length);
  }, [dataProduct.length]);
  return (
    <>
      {dataProduct.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {paginatedData.slice(0, pageSize).map((element) => (
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
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <EmptyComponent />
      )}
    </>
  );
};

export default SellerAuction;
