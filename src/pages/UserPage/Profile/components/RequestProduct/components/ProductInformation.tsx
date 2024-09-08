import { Form, Input, InputNumber } from 'antd'
import LabelForm from '../../../../../../components/LabelForm'

const ProductInformation = () => {
  return (
    <>
      <p className='text-xl text-primaryColor font-semibold col-span-3'>Thông tin sản phẩm</p>
      <Form.Item label={<LabelForm>Tên sản phẩm</LabelForm>} name={'name'} className='col-span-3'>
        <Input />
      </Form.Item>
      <Form.Item label={<LabelForm>Giá khởi điểm</LabelForm>} name={'startingPrice'} className='col-span-1'>
        <InputNumber className='w-full' />
      </Form.Item>
      <Form.Item label={<LabelForm>Điều kiện sản phẩm</LabelForm>} name={'condition'} className='col-span-1'>
        <Input className='w-full' />
      </Form.Item>
    </>
  )
}

export default ProductInformation