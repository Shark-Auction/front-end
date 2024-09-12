import { Button, Divider, Input } from "antd";
import MenuComponent from "../../../../../components/Menu";

interface FilterSideTabProps {
  items: any[];
  setSelectedkey: any;
  setSearchText: any;
  searchText: any
}

const FilterSideTab = ({ items = [], setSelectedkey, setSearchText, searchText }: FilterSideTabProps) => {

  const handleReset = () => {
    setSelectedkey(null);
    setSearchText(null)
  };

  return (
    <div className="w-full h-fit flex flex-col">
      <div className="flex flex-col gap-3">
        <Input
          className="!w-full"
          placeholder="Nhập từ khóa..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <div className="w-full flex justify-end">
          <Button
            type="primary"
            className="w-full text-base"
            onClick={handleReset}
          >
            Đặt lại
          </Button>
        </div>
      </div>
      <Divider className="border-black py-1" />
      <p className="text-xl font-semibold">Danh mục</p>
      <div>
        <MenuComponent items={items} className="!bg-inherit !border-none" />
      </div>
    </div>
  );
};

export default FilterSideTab;
