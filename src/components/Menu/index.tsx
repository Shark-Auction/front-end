import { GetProp, Menu, MenuProps } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

type MenuItem = GetProp<MenuProps, "items">[number];

interface MenuComponentProps {
  items: MenuItem[];
  className?: string[] | string;
  onReset?: () => void;
}

const MenuComponent = forwardRef(({ items = [], className = "", onReset }: MenuComponentProps, ref) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKeys([key]);
  };

  const handleDeselect: MenuProps["onDeselect"] = ({ key }) => {
    setSelectedKeys((prev) => prev.filter((k) => k !== key));
  };

  useImperativeHandle(ref, () => ({
    resetFilters: () => {
      setSelectedKeys([]);
      if (onReset) onReset();
    },
  }));

  return (
    <Menu
      items={items}
      mode="inline"
      className={`menu-component !p-0 ${className}`}
      selectable={true}
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
    />
  );
});

export default MenuComponent;
