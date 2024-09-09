import { GetProp, Menu, MenuProps } from "antd";
import './index.css'
type MenuItem = GetProp<MenuProps, "items">[number];

interface MenuComponentProps {
  items: MenuItem[];
  className?: string[] | string;
}

const MenuComponent = ({ items = [], className = ''}: MenuComponentProps) => {
  return (
    <Menu
      items={items}
      mode="inline"
      className={`menu-component !p-0 ${className}`}
      selectable={false}
    />
  );
};

export default MenuComponent;
