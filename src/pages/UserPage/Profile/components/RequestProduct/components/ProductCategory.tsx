import { Form, Image, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LabelForm from "../../../../../../components/LabelForm";
import { Category } from "../../../../../../model/category";
import { categoryApi } from "../../../../../../service/api/categoryApi";
import { getImageCategory } from "../../../../../../utils/getImage";

const ProductCategory = () => {
  const [category, setCategory] = useState<any[]>([]);

  const transformData = (data: any) => {
    const map = new Map();
    const tree: any[] = [];
    data.forEach((item: Category) => {
      map.set(item.id, {
        value: item.id,
        title: <div className="flex gap-2 items-center py-2">
          <Image className="rounded-lg" width={40} height={40} preview={false} src={getImageCategory(item.imageUrl)} />
          <p>{item.name}</p>
        </div>,
        children: [],
      });
    });

    // Build the tree structure
    data.forEach((item: any) => {
      if (item.parent) {
        const parentNode = map.get(item.parent.id);
        if (parentNode) {
          parentNode.children.push(map.get(item.id));
        }
      } else {
        tree.push(map.get(item.id));
      }
    });

    return tree;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getCategory();
        const transformedData = transformData(response.data);
        setCategory(transformedData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="text-xl text-primaryColor font-semibold col-span-3">
        Danh mục sản phẩm
      </p>
      <Form.Item
        label={<LabelForm>Chọn danh mục</LabelForm>}
        name={"categoryId"}
        rules={[
          {
            required: true,
            message: "Không được dể trống",
          },
        ]}
      >
        <TreeSelect
          showSearch
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Chọn..."
          allowClear
          treeDefaultExpandAll
          treeData={category}
          className="h-fit"
        />
      </Form.Item>
    </>
  );
};

export default ProductCategory;
