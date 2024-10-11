import { Card } from "antd";
import AccountChart from "./components/Chart/AccountChart";
import TransactionChart from "./components/Chart/TransactionsChart";
import AccountStatistics from "./components/Statistics/AccountStatistics";
import AuctionStatistics from "./components/Statistics/AuctionStatistics";
import DeliveryStatistics from "./components/Statistics/DeliveryStatistics";
import OrderStatistics from "./components/Statistics/OrderStatistics";
import ProductStatistics from "./components/Statistics/ProductStatistics";
import RatingStatistics from "./components/Statistics/RatingStatistics";
import OrderBarChart from "./components/Chart/OrderChart";

const StatisticManagement = () => {
  const valuesStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 25,
  };
  return (
    <div className="flex flex-col gap-5">
      <Card className="shadow-shadowLight">
        <div className="grid grid-cols-6">
          <RatingStatistics valuesStyle={valuesStyle} />
          <ProductStatistics valuesStyle={valuesStyle} />
          <AuctionStatistics valuesStyle={valuesStyle} />
          <AccountStatistics valuesStyle={valuesStyle} />
          <DeliveryStatistics valuesStyle={valuesStyle} />
          <OrderStatistics valuesStyle={valuesStyle} />
        </div>
      </Card>
      <div className="mt-5">
        <TransactionChart />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <AccountChart />
        <OrderBarChart />
      </div>
    </div>
  );
};

export default StatisticManagement;
