import { AuctionList } from "./components/AuctionList";
import FilterSideTab from "./components/FilterSideTab";
import { SortingAuction } from "./components/SortingAuction";

const AuctionPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full h-[500px] hidden md:block shadow-shadowLight">
        <img
          className="w-full h-full object-cover"
          src="/src/assets/background_home.jpeg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4 h-fit px-2 py-4 border shadow-shadowHeavy rounded-md">
          <FilterSideTab />
        </div>
        <div className="md:w-3/4 flex flex-col gap-10">
          <SortingAuction />
          <div>
            <AuctionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
