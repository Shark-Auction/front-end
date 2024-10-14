import { Button, Divider, Input } from "antd";
import MenuComponent from "../../../../../components/Menu";
import { useRef } from "react";

interface FilterSideTabProps {
  items: any[];
  setSelectedkey: any;
  setSearchText: any;
  searchText: any;
}

const FilterSideTab = ({
  items = [],
  setSelectedkey,
  setSearchText,
  searchText,
}: FilterSideTabProps) => {
  const menuRef = useRef<{ resetFilters: () => void }>(null);

  const handleReset = () => {
    setSelectedkey(null);
    setSearchText(null);
    menuRef.current?.resetFilters();
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
        <MenuComponent ref={menuRef} items={items} className="!bg-inherit !border-none" />
      </div>
    </div>
  );
};

export default FilterSideTab;
