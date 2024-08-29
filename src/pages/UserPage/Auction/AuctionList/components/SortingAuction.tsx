import { Checkbox, GetProp, Select } from "antd";

export const SortingAuction = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };

  const optionsPricing = [
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
  ];

  const optionsCheckbox = [
    { label: 'In Coming', value: 'incoming' },
    { label: 'In Progress', value: 'inprogress' },
  ];

  return (
    <div className="border shadow-shadowHeavy rounded-md px-2 py-2 flex flex-col md:flex-row items-center gap-5">
      <Checkbox.Group
        options={optionsCheckbox}
        onChange={onChange}
      />
      <Select
        placeholder={<p className="text-black">Price</p>}
        style={{ width: 150 }}
        onChange={handleChange}
        options={optionsPricing}
      />
    </div>
  );
};
