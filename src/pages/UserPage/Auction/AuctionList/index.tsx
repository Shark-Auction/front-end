import { useEffect, useState } from "react";
import { AuctionList } from "./components/AuctionList";
import FilterSideTab from "./components/FilterSideTab";
import { SortingAuction } from "./components/SortingAuction";
import { Category } from "../../../../model/category";
import { toast } from "react-toastify";
import { categoryApi } from "../../../../service/api/categoryApi";
import { GetProp, MenuProps, Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
type MenuItem = GetProp<MenuProps, "items">[number];

const AuctionPage = () => {
  const [category, setCategory] = useState<MenuItem[]>([]);
  const [selectedKey, setSelectedKey] = useState<number>();
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<string>("");
  const [dataAuction, setDataAuction] = useState<Auction[]>([]);
  const [filteredAuction, setFilteredAuction] = useState<Auction[]>([]);
  const handleMenuClick = (key: any) => {
    setSelectedKey(key);
  };
  const parseCategoriesToMenuItems = (categories: Category[]): MenuItem[] => {
    const menuItems: MenuItem[] = [];
    categories.forEach((category: Category) => {
      if (!category.parent) {
        const children = categories
          .filter(
            (childCategory: Category) =>
              childCategory.parent?.id === category.id
          )
          .map((childCategory: Category) => ({
            key: childCategory.id.toString(),
            label: (
              <div>
                <p onClick={() => handleMenuClick(childCategory.id)}>
                  {childCategory.name}
                </p>
              </div>
            ),
          }));

        menuItems.push({
          key: category.id.toString(),
          label: (
            <p className="w-fit" onClick={() => handleMenuClick(category.id)}>
              {category.name}
            </p>
          ),
          children: children.length > 0 ? children : undefined,
        });
      }
    });

    return menuItems;
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await categoryApi.getCategory();
        setCategory(parseCategoriesToMenuItems(response.data));
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataAuction = async () => {
      try {
        setLoading(true);
        const response = await auctionApi.getAuction();
        const filteredData = response.data
          .filter((e: Auction) => e.status !== "Cancel")
          .sort(
            (a: Auction, b: Auction) =>
              new Date(b?.startTime).getTime() -
              new Date(a?.startTime).getTime()
          );
        setDataAuction(filteredData);
        setFilteredAuction(filteredData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAuction();
    fetchCategory();
  }, []);

  useEffect(() => {
    let filtered: Auction[] = dataAuction;

    if (selectedKey) {
      filtered = dataAuction.filter(
        (auction: Auction) => auction.product.category.id === selectedKey
      );
    }

    if (searchText) {
      filtered = dataAuction.filter((auction: Auction) =>
        auction.product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (priceSort) {
      filtered = filtered.sort((a: Auction, b: Auction) => {
        if (priceSort === "ascending") {
          return a.currentPrice - b.currentPrice;
        } else if (priceSort === "descending") {
          return b.currentPrice - a.currentPrice;
        }
        return 0;
      });
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((auction: Auction) =>
        statusFilter.includes(auction.status)
      );
    }
    setFilteredAuction(
      filtered.sort(
        (a: Auction, b: Auction) =>
          new Date(b?.startTime).getTime() - new Date(a?.startTime).getTime()
      )
    );
  }, [selectedKey, dataAuction, searchText, priceSort, statusFilter]);

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full h-[500px] hidden md:block shadow-shadowLight">
        <img
          className="w-full h-full object-cover"
          src="/src/assets/background_home.jpeg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Skeleton loading={loading}>
          <div className="md:w-1/4 h-fit px-2 py-4 border shadow-shadowHeavy rounded-md">
            <FilterSideTab
              searchText={searchText}
              items={category}
              setSelectedkey={setSelectedKey}
              setSearchText={setSearchText}
            />
          </div>
        </Skeleton>
        <div className="md:w-3/4 flex flex-col gap-10">
          <SortingAuction
            setStatusFilter={setStatusFilter}
            setPriceSorting={setPriceSort}
          />
          <div>
            <Skeleton loading={loading}>
              <AuctionList
                priceSort={priceSort}
                dataProduct={filteredAuction}
              />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
