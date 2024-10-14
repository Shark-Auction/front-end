import { useEffect, useMemo, useState } from "react";
import { AuctionList } from "./components/AuctionList";
import FilterSideTab from "./components/FilterSideTab";
import { SortingAuction } from "./components/SortingAuction";
import { Category } from "../../../../model/category";
import { toast } from "react-toastify";
import { categoryApi } from "../../../../service/api/categoryApi";
import { GetProp, Image, MenuProps, Skeleton } from "antd";
import { Auction } from "../../../../model/auction";
import { auctionApi } from "../../../../service/api/auctionApi";
import { getImageCategory, getImageFE } from "../../../../utils/getImage";
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
              <div
                className="flex gap-5 items-center"
                onClick={() => handleMenuClick(childCategory.id)}
              >
                <Image
                  className="rounded-lg"
                  width={40}
                  height={40}
                  preview={false}
                  src={getImageCategory(childCategory.imageUrl)}
                />
                <p className="text-base font-medium">{childCategory.name}</p>
              </div>
            ),
          }));

        menuItems.push({
          key: category.id.toString(),
          label: (
            <div
              className="flex gap-5 items-center"
              onClick={() => handleMenuClick(category.id)}
            >
              <Image
                className="rounded-lg"
                width={40}
                height={40}
                preview={false}
                src={getImageCategory(category.imageUrl)}
              />
              <p className="text-base font-medium">{category.name}</p>
            </div>
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
          .filter(
            (e: Auction) => e.status === "Waiting" || e.status === "InProgress"
          )
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

  const sortedAndFilteredAuctions = useMemo(() => {
    let filtered = dataAuction;

    if (selectedKey) {
      filtered = filtered.filter(
        (auction) =>
          auction.product.category.id === selectedKey ||
          (auction.product.category.parent !== null
            ? auction.product.category.parent.id === selectedKey
            : "")
      );
    }

    if (searchText) {
      filtered = filtered.filter((auction) =>
        auction.product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (priceSort) {
      filtered = filtered.sort((a, b) => {
        if (priceSort === "ascending") {
          return a.currentPrice - b.currentPrice;
        } else if (priceSort === "descending") {
          return b.currentPrice - a.currentPrice;
        }
        return 0;
      });
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((auction) =>
        statusFilter.includes(auction.status)
      );
    }

    return filtered;
  }, [selectedKey, dataAuction, searchText, priceSort, statusFilter]);

  useEffect(() => {
    setFilteredAuction(sortedAndFilteredAuctions);
  }, [sortedAndFilteredAuctions]);

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full h-[500px] hidden md:block shadow-shadowLight">
        <img
          className="w-full h-full object-cover"
          src={getImageFE("background_home.jpeg")}
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
