'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Image, InputNumber, Rate } from 'antd';
import React from 'react';
import CustomPriceProduct from './CustomPriceProduct';
import EvaluateProduct from './EvaluateProduct';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { CardProductProps } from '@/features/home/components/CardProduct';
import { addItemToCart } from '@/redux/reducers/cartReducer';
const dataFake = {
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
const DetailProductComponent: React.FC<CardProductProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	return (
		<>
			<div className='p-8 shadow-xl'>
				<MRow gutter={12}>
					<MCol span={8}>
						<Image
							src={dataFake.image}
							alt={dataFake.name}
						/>
					</MCol>
					<MCol span={16}>
						<MTitle>{dataFake.name}</MTitle>
						<MRow>
							<MCol className='flex items-center'>
								<MTitle level={4}>{dataFake.rating}</MTitle>
								<Rate
									disabled
									defaultValue={dataFake.rating}
								/>
							</MCol>
						</MRow>
						<CustomPriceProduct
							price={dataFake.price}
							sales={dataFake.countSales}
						/>
						<MTitle>{`Mã sản phẩm: #${dataFake.id}`}</MTitle>
						<MText>{dataFake.decription}</MText>
						<Form>
							<Form.Item name={'count'}>
								<MTitle>Số lượng</MTitle>
								<InputNumber
									min={1}
									max={999}
									defaultValue={1}
								/>
							</Form.Item>
							<div className='flex gap-4'>
								<MButton className='bg-black text-white'>
									<FontAwesomeIcon icon={faCartShopping} />
									&nbsp; Thêm vào giỏ hàng
								</MButton>
								<MButton
									htmlType='submit'
									className='bg-red-400 text-white'
									onClick={() => {
										try {
											dispatch(addItemToCart(data));
											toast.success(`Add ${data.name} successfully added`);
										} catch {
											toast.error(`Add ${data.name} failed`);
										}
									}}
								>
									<FontAwesomeIcon icon={faCheck} />
									&nbsp; Mua ngay
								</MButton>
							</div>
						</Form>
					</MCol>
				</MRow>
			</div>
			<EvaluateProduct />
		</>
	);
};

export default DetailProductComponent;
