import { Checkbox, GetProp, Select } from "antd";

interface SortingAuctionProps {
  setPriceSorting: any;
  setStatusFilter: any;
}

export const SortingAuction = ({ setPriceSorting, setStatusFilter }: SortingAuctionProps) => {
  const handleChange = (value: string) => {
    setPriceSorting(value);
  };

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setStatusFilter(checkedValues as string[]);
  };

  const optionsPricing = [
    { value: "ascending", label: <p className="text-base">Giá tăng dần</p> },
    { value: "descending", label: <p className="text-base">Giá giảm dần</p> },
  ];

  const optionsCheckbox = [
    { label: <p className="text-base">Đợi đấu giá</p>, value: "Waiting" },
    { label: <p className="text-base">Đang đấu giá</p>, value: "InProgress" },
  ];

  return (
    <div className="border shadow-shadowHeavy rounded-md px-2 py-2 flex flex-col md:flex-row items-center gap-5">
      <Checkbox.Group options={optionsCheckbox} onChange={onChange} />
      <Select
        placeholder={<p className="text-black text-base">Sắp xếp theo giá</p>}
        style={{ width: 150 }}
        onChange={handleChange}
        options={optionsPricing}
      />
    </div>
  );
};
