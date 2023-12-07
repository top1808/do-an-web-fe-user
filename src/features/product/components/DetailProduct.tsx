'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, InputNumber, Rate } from 'antd';
import React, { useState } from 'react';
import CustomPriceProduct from './CustomPriceProduct';
import EvaluateProduct from './EvaluateProduct';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product } from '@/models/productModels';
import { addingItemToCart } from '@/redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FuntionHelpers';

export const dataFake = {
	id: '11241123',
	name: 'Banh trung thu 2 trung',
	price: 10000000,
	decription: 'Mỳ Ý sốt cà chua hương vị ngon, thưởng thức rất hợp khẩu vị. Món ăn không gây béo mà hương vị lại đầy đủ, rất dễ ăn',
	image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/my_xao_thap_cam_large.jpg',
	rating: 4.5,
	countSales: 80,
	listComments: [
		{
			id: '12321312',
			idUser: '!@3123',
			name: 'Le Top',
			content: 'sadasdsadsadasdas',
			rate: 4.6,
		},
	],
};

interface DetailProductComponent {
	productInfor?: Product;
}

const DetailProductComponent: React.FC<DetailProductComponent> = (props) => {
	console.log('🚀 ~ file: DetailProduct.tsx:47 ~ props:', props);
	const { productInfor } = props;
	const { data: session } = useSession();

	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(1);

	function handleAddToCart() {
		const product = {
			...productInfor,
			quantity: quantity,
		};
		session ? dispatch(addingItemToCart(product as Product)) : toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng !');
	}

	return (
		<>
			<div className='p-8 shadow-xl'>
				<MRow gutter={12}>
					<MCol span={8}>
						<Image
							src={productInfor?.image}
							alt={productInfor?.name}
						/>
					</MCol>
					<MCol span={16}>
						<MTitle level={3}>{productInfor?.name}</MTitle>
						{/* <MRow>
									<MCol className='flex items-center'>
										<MTitle level={4}>{dataFake.rating}</MTitle>
										<Rate
											disabled
											defaultValue={dataFake.rating}
										/>
									</MCol>
								</MRow> */}
						<CustomPriceProduct
							price={productInfor?.price}
							sales={productInfor?.discount}
						/>
						{/* <MTitle>{`Mã sản phẩm: #${dataFake.id}`}</MTitle> */}
						<MText>{productInfor?.decription}</MText>
						<div className='pt-4'>
							<MTitle level={3}>Số lượng</MTitle>
							<InputNumber
								min={1}
								max={9999}
								formatter={handleFormatterInputNumber}
								parser={handleParserInputNumber}
								onChange={(value) => {
									value ? setQuantity(value) : setQuantity(1);
								}}
								value={quantity}
							/>
							<div className='flex gap-4 pt-4'>
								<MButton
									className='bg-black text-white'
									onClick={handleAddToCart}
								>
									<FontAwesomeIcon icon={faCartShopping} />
									&nbsp; Thêm vào giỏ hàng
								</MButton>
								<MButton
									className='bg-red-400 text-white'
									onClick={() => {}}
								>
									<FontAwesomeIcon icon={faCheck} />
									&nbsp; Mua ngay
								</MButton>
							</div>
						</div>
					</MCol>
				</MRow>
			</div>
			<EvaluateProduct />
		</>
	);
};

export default DetailProductComponent;
