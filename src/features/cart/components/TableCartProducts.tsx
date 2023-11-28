'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React, { useEffect, useState } from 'react';
import MButton from '@/components/MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MImage from '@/components/MImage';
import MTitle from '@/components/MTitle';
import { caculatorTotalPrice, customMoney } from '@/utils/FuntionHelpers';
import { InputNumber } from 'antd';
import { Product } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removingItemToCart, updatingCart } from '@/redux/reducers/cartReducer';
const image = 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg';
const TableCartProducts = ({ data }: { data: Product[] }) => {
	const dispatch = useAppDispatch();
	const { cart } = useAppSelector((state) => state);
	const [summaryMoney, setSummaryMoney] = useState<string>(customMoney(caculatorTotalPrice(data)));
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [dataUpdating, setDataUpdating] = useState<Product>();
	const [quantity, setQuantity] = useState<number>(1);
	useEffect(() => {
		setSummaryMoney(customMoney(caculatorTotalPrice(cart.items)));
	}, [cart.items]);
	useEffect(() => {
		if (!isUpdating) clearTimeout;
		else {
			if (dataUpdating) {
				setTimeout(() => {
					const itemUpdate = dataUpdating;
					dispatch(updatingCart(itemUpdate));
				}, 1000);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUpdating]);
	return (
		<>
			<MRow className='bg-gray-400 py-2 px-1'>
				<MCol
					className='text-center'
					span={4}
				></MCol>
				<MCol
					className='text-center'
					span={6}
				>
					<MText>Tên sản phẩm</MText>
				</MCol>
				<MCol
					className='text-end'
					span={3}
				>
					<MText>Giá</MText>
				</MCol>
				<MCol
					className='text-center'
					span={3}
				>
					<MText>Số lượng</MText>
				</MCol>
				<MCol
					className='text-end'
					span={6}
				>
					<MText>Thành tiền</MText>
				</MCol>
				<MCol
					className='text-center'
					span={2}
				></MCol>
			</MRow>
			{data.map((item, index: number) => {
				return (
					<MRow
						key={index}
						align={'middle'}
						style={{ borderBottom: ' 1px solid black' }}
					>
						<MCol
							className='text-center py-2'
							span={4}
						>
							<MImage
								preview={false}
								src={image}
								alt={`${item.name} image`}
								height={60}
							/>
						</MCol>
						<MCol
							span={6}
							className='text-center'
						>
							<MText>{item.name}</MText>
						</MCol>
						<MCol
							className='text-end'
							span={3}
						>
							<MText>{`${customMoney(item.price)}`}</MText>
						</MCol>
						<MCol
							className='text-center'
							span={3}
						>
							<InputNumber
								defaultValue={item.quantity}
								min={1}
								max={999}
								value={quantity}
								onChange={(value) => {
									value ? setQuantity(value) : setQuantity(1);
									const temp: Product = { ...item };
									temp.quantity = quantity;
									if (isUpdating) setIsUpdating(false);
									setTimeout(() => {
										setDataUpdating(temp);
										setIsUpdating(true);
									}, 2000);
								}}
							/>
						</MCol>
						<MCol
							className='text-end'
							span={6}
						>
							<MText>{`${customMoney(item.price * item.quantity)}`}</MText>
						</MCol>
						<MCol span={2}>
							<MButton
								className='border-none'
								onClick={() => {
									dispatch(removingItemToCart(item._id));
								}}
							>
								<FontAwesomeIcon
									color='red'
									icon={faTrash}
								/>
							</MButton>
						</MCol>
					</MRow>
				);
			})}

			<MTitle
				level={3}
				className='text-end pr-2'
			>
				{`Tổng tiền: ${summaryMoney}`}
			</MTitle>
		</>
	);
};

export default TableCartProducts;
