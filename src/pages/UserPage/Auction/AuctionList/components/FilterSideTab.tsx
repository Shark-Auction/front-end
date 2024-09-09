import { Divider } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import MenuComponent from "../../../../../components/Menu";

interface FilterSideTabProps {
  items: any[];
}

const FilterSideTab = ({ items = [] }: FilterSideTabProps) => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="w-full h-fit flex flex-col">
      <div>
        <Search
          className="!w-full"
          placeholder="Nhập từ khóa..."
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <Divider className="border-black" />
      <p className="text-xl font-semibold">Danh mục</p>
      <div>
        <MenuComponent
          items={items}
          className="!bg-inherit !border-none"
        />
      </div>
    </div>
  );
};

export default FilterSideTab;
