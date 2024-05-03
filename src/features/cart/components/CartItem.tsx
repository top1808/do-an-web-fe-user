import MButtonDelete from '@/components/MButtonDelete';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInputQuantity from '@/components/MInputQuantity';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { CartProduct } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCartState, removingItemToCart, updatingCart } from '@/redux/reducers/cartReducer';
import { customMoney } from '@/utils/FunctionHelpers';
import Link from 'next/link';
import React, { useState } from 'react';

interface CartItemProps {
	item?: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const cart = useAppSelector(getCartState);
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const resetTimer = (quantity: number) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		const newTimeoutId = setTimeout(() => callApiUpdate(quantity), 500);
		setTimeoutId(newTimeoutId);
	};

	const onChangeQuantity = (newValue: number) => {
		const newQuantity = newValue > 0 ? (newValue > 99 ? 99 : newValue) : 1;
		setQuantity(newQuantity);
		resetTimer(newQuantity);
	};

	const callApiUpdate = (quantity: number) => {
		const data: CartProduct = {
			_id: item?._id,
			quantity: quantity,
		};
		dispatch(updatingCart(data));
	};

	return (
		<MRow
			align={'middle'}
			className='px-2 py-1'
			gutter={4}
		>
			<MCol
				className='text-center py-2'
				lg={3}
				xs={8}
			>
				<Link
					href={`/product/${item?.product?._id}`}
					className='hover:opacity-80'
				>
					<MImage
						preview={false}
						src={item?.product?.images?.[0]}
						alt={`${item?.product?.name}`}
						height={60}
					/>
				</Link>
			</MCol>
			<MCol
				xs={16}
				lg={21}
			>
				<MRow className='w-full'>
					<MCol
						xs={24}
						lg={10}
					>
						<Link href={`/product/${item?.product?._id}`}>
							<MText className='hover:text-blue-600 text-base font-medium'>{item?.product?.name}</MText>
						</Link>
						<div>
							{item?.productSKU?.options?.map((group) => (
								<div key={group?.groupName}>
									<p className='text-gray-500'>
										{group?.groupName}: {group?.option}
									</p>
								</div>
							))}
						</div>
					</MCol>
					<MCol
						xs={24}
						lg={4}
					>
						<MText className={`${item?.discount ? 'line-through' : ''}`}>{`${customMoney(item?.discount ? item.discount.price : item?.price)}`}</MText> <br />
						{item?.discount && <MText>{`${customMoney(item.discount.promotionPrice || 0)}`}</MText>}
					</MCol>
					<MCol
						xs={12}
						lg={4}
					>
						<MInputQuantity
							value={quantity}
							onClickMinus={() => onChangeQuantity(quantity - 1)}
							onClickPlus={() => onChangeQuantity(quantity + 1)}
							onChange={(value) => {
								setQuantity((value as number) || 1);
							}}
							onBlur={() => callApiUpdate(quantity)}
							disabled={cart.statusUpdate === 'loading' || !item?.isChecked}
						/>
					</MCol>
					<MCol
						xs={0}
						lg={4}
					>
						<MText>{`${customMoney((item?.price || 0) * (item?.quantity || 0))}`}</MText>
					</MCol>
					<MCol
						xs={12}
						lg={2}
					>
						<MButtonDelete
							title={`Xóa sản phẩm ${item?.product?.name}? `}
							onConfirm={() => dispatch(removingItemToCart(item?._id as string))}
						></MButtonDelete>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};

export default CartItem;
