import { Pagination } from "antd";
import { useEffect, useState } from "react";
import CardElement from "../../../../../components/Card";
import { useNavigate } from "react-router-dom";
import EmptyComponent from "../../../../../components/Empty";
import { Auction } from "../../../../../model/auction";
import { statusAuction } from "../../../../../utils/render/statusRender";

interface AuctionListProps {
  dataProduct: Auction[];
  priceSort: string;
}

export const AuctionList = ({ dataProduct, priceSort }: AuctionListProps) => {
  const [dataSource, setDataSource] = useState<Auction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const paginatedData: Auction[] = dataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleDetail = (id: any) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    setTotalItems(dataSource.length);
  }, [dataSource.length]);

  useEffect(() => {
    setDataSource(dataProduct)
  }, [dataProduct])

  return (
    <div className="flex flex-col gap-10">
      {paginatedData.length > 0 ? (
        <>
          <div key={priceSort} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedData.map((element) => (
              <CardElement
                key={element.id}
                image={element.product.thumbnail}
                id={element.id}
                name={element.product.name}
                remainDay={element.endTime}
                currentPrice={element.currentPrice}
                status={statusAuction[element.status]()}
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
        </>
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
};
