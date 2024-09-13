import { Form, TreeSelect, TreeSelectProps } from 'antd'
import { useEffect, useState } from 'react'
import LabelForm from '../../../../../../../../../components/LabelForm'
import { categoryApi } from '../../../../../../../../../service/api/categoryApi';
import { toast } from 'react-toastify';

const ItemCategory = () => {
  const [category, setCategory] = useState<any[]>([]);
  const onPopupScroll: TreeSelectProps["onPopupScroll"] = (e) => {
    console.log("onPopupScroll", e);
  };

  const transformData = (data: any) => {
    const map = new Map();
    const tree: any[] = [];

    // Create a map of id to node
    data.forEach((item: any) => {
      map.set(item.id, {
        value: item.id,
        title: item.name,
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
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Chọn..."
          allowClear
          treeDefaultExpandAll
          treeData={category}
          onPopupScroll={onPopupScroll}
        />
      </Form.Item>
  )
}

export default ItemCategory