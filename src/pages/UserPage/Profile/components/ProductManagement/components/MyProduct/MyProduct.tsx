  import { useEffect, useState } from 'react';
  import TableComponent, { ColumnsTable } from '../../../../../../../components/Table';
  import { Tag } from 'antd';
import ImageComponent from '../../../../../../../components/Image';
import { status } from '../../../../../../../utils/render/statusRender';
import ModalDetail from './components/ModalDetail';
import { formatVND } from '../../../../../../../utils/format';
import { ProductProfile } from '../../../../../../../model/profile';
import { getImageProduct } from '../../../../../../../utils/getImage';

  const MyProduct = ({activeKey} : {activeKey: string}) => {
    const [selectedRow, setSelectedRow] = useState<ProductProfile>();
    const [isOpen, setIsOpen] = useState(false);
    const [render, setRender] = useState(false)
    const columns: ColumnsTable[] = [
      {
        title: "#",
        key: "id",
        dataIndex: "id",
        fixed: 'left',
        width: 150,
        align: 'center'
      },
      {
        title: "Ảnh",
        key: "image",
        dataIndex: "thumbnail",
        render: (data) => <ImageComponent preview={false} height={150} width={150} src={getImageProduct(data)} />,
        width: 200
      },
      {
        title: "Tên",
        key: "name",
        dataIndex: "name",
      },
      {
        title: 'Giá khởi điểm',
        key: 'startingPrice',
        dataIndex: 'startingPrice',
        render: (data) => <p className='font-bold text-base text-orange-600'>{formatVND(data)}</p>
      },
      {
        title: "Danh mục",
        key: "category",
        dataIndex: "category",
        render: (data) => (
          <div className='flex flex-col gap-2 w-full'>
            <Tag className='w-fit'>{data.name}</Tag>
            {data.parent != null && <Tag className=' w-fit' color='green'>{data.parent.name}</Tag>}
          </div>
        )
      },
      {
        title: "Hãng",
        key: "brand",
        dataIndex: "brand",
        render: (data) => (
          <Tag color='lime'>{data.name}</Tag>
        )
      },
      {
        title: 'Xuất xứ',
        key: 'origin',
        dataIndex: 'origin',
        render: (data) => (
          <Tag color='blue'>{data.name}</Tag>
        )
      },
      {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        render: (data) => status[data]()
      },
     
    ];

    const handleRowClick = (record: any) => {
      setSelectedRow(record);
      setIsOpen(true);
    };

    useEffect(() => {
      if(activeKey === '1') {
        setRender(true)
      }
    }, [activeKey])

    return (
      <>
        <TableComponent 
          apiUri='product/me' 
          columns={columns}
          expandX={1700} 
          onRow={(record: ProductProfile) => {
            return {
              onClick: () => handleRowClick(record),
              style: {
                cursor: 'pointer'
              }
            };
          }}
          render={render}
          setRender={setRender}
        />

        <ModalDetail setRender={setRender} data={selectedRow} open={isOpen} setOpen={setIsOpen} />
      </>
    );
  };

  export default MyProduct;
