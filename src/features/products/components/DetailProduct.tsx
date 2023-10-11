'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Image, InputNumber, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import CustomPriceProduct from './CustomPriceProduct';
import EvaluateProduct from './EvaluateProduct';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useParams } from 'next/navigation';
import { Product } from '@/models/productModels';
import { addingItemToCart } from '@/redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import Link from 'next/link';
import PaymentPage from '@/features/cart/components/PaymentPage';

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
const DetailProductComponent = () => {
	const { auth } = useAppSelector((state) => state);
	const param = useParams();
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(1);
	const [isBuyNow, setIsBuyNow] = useState<boolean>(false);
	const [dataProduct, setDataProduct] = useState();
	4;
	function handleAddToCart() {
		const product: Product = {
			_id: dataFake.id,
			name: dataFake.name,
			price: dataFake.price,
			quantity: quantity,
		};
		auth.isLoggedIn ? dispatch(addingItemToCart(product)) : toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng !');
	}
	useEffect(() => {
		const fetchData = async () => {
			// fetch data
		};
		fetchData();
	}, []);
	return (
		<>
			{!isBuyNow && (
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
								<div className='pt-4'>
									<MTitle level={3}>Số lượng</MTitle>
									<InputNumber
										min={1}
										max={999}
										defaultValue={quantity}
										onChange={(value) => (value ? setQuantity(value) : setQuantity(1))}
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
											onClick={() => {
												window.scrollTo(0, 0);
												setIsBuyNow(true);
											}}
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
			)}
			{isBuyNow && (
				<>
					<div className='py-2'>
						<MButton onClick={() => setIsBuyNow(false)}>Back</MButton>
					</div>
					<PaymentPage data={[{ _id: dataFake.id, name: dataFake.name, price: dataFake.price, quantity: quantity }]} />
				</>
			)}
		</>
	);
};

export default DetailProductComponent;
