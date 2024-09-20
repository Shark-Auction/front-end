import React from 'react';
import { Modal, Descriptions, Image } from 'antd';
import { formatDateHour } from '../../../utils/format';
import { getImageProduct } from '../../../utils/getImage';

interface ProductDetailModalProps {
    visible: boolean;
    onClose: () => void;
    product: any; // Replace `any` with a proper type if available
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ visible, onClose, product }) => {
    return (
        <Modal
            visible={visible}
            title="Product Details"
            onCancel={onClose}
            footer={null}
            width={800}
        >
            {product && (
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Product Name">{product.name}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">{product.category?.name}</Descriptions.Item>
                    <Descriptions.Item label="Brand">{product.brand?.name}</Descriptions.Item>
                    <Descriptions.Item label="Origin">{product.origin?.name}</Descriptions.Item>
                    <Descriptions.Item label="Condition">{product.condition}</Descriptions.Item>
                    <Descriptions.Item label="Starting Price">{product.startingPrice}</Descriptions.Item>
                    <Descriptions.Item label="Status">{product.status}</Descriptions.Item>
                    <Descriptions.Item label="Created At">{formatDateHour(product.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{formatDateHour(product.updatedAt)}</Descriptions.Item>

                    {/* Seller Info */}
                    <Descriptions.Item label="Seller Name">{product.seller?.full_name}</Descriptions.Item>
                    <Descriptions.Item label="Seller Username">{product.seller?.user_name}</Descriptions.Item>
                    <Descriptions.Item label="Seller Phone">{product.seller?.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="Seller Email">{product.seller?.email}</Descriptions.Item>

                    {/* Images */}
                    <Descriptions.Item label="Thumbnail" span={2}>
                        <Image src={getImageProduct(product.thumbnail)} width={200} />
                    </Descriptions.Item>
                    {product.product_images?.map((img: any) => (
                        <Descriptions.Item label="Additional Image" key={img.id}>
                            <Image src={getImageProduct(img.url)} width={200} />
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Modal>
    );
};

export default ProductDetailModal;
