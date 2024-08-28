import { Divider, Button } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState } from "react";

const FilterSideTab = () => {
  const [category, setCategory] = useState(
    new Array(20).fill(null).map((_, index) => ({
      icon: "/src/assets/logo_exe.png",
      name: `Category ${index + 1}`,
    }))
  );
  const [showMore, setShowMore] = useState(false);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full h-fit flex flex-col">
      <div>
        <Search
          className="!w-full"
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <Divider className="border-black" />
      <div className="flex flex-col gap-3">
        <p className="text-xl font-medium">Category</p>
        {category.slice(0, showMore ? category.length : 7).map((e, index) => (
          <p className="text-base" key={index}>{e.name}</p>
        ))}
        <Button type="link" onClick={handleToggle}>
          <p className="text-base">{showMore ? "View Less" : "View More"}</p>
        </Button>
      </div>
    </div>
  );
};

export default FilterSideTab;
