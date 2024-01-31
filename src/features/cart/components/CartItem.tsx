import MButtonDelete from '@/components/MButtonDelete';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInputQuantity from '@/components/MInputQuantity';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { CartProduct } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removingItemToCart, updatingCart } from '@/redux/reducers/cartReducer';
import { customMoney } from '@/utils/FunctionHelpers';
import React, { useState } from 'react';

interface CartItemProps {
	item?: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { cart } = useAppSelector((state) => state);

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
			style={{ borderBottom: ' 1px solid black' }}
			className='px-2 py-1'
			gutter={4}
		>
			<MCol
				className='text-center py-2'
				span={3}
			>
				<MImage
					preview={false}
					src={item?.product?.image}
					alt={`${item?.product?.name} image`}
					height={60}
				/>
			</MCol>
			<MCol span={9}>
				<MText>{item?.product?.name}</MText>
			</MCol>
			<MCol
				className='text-end'
				span={3}
			>
				<MText>{`${customMoney(item?.price || 0)}`}</MText>
			</MCol>
			<MCol
				className='flex justify-center'
				span={3}
			>
				<MInputQuantity
					value={quantity}
					onClickMinus={() => onChangeQuantity(quantity - 1)}
					onClickPlus={() => onChangeQuantity(quantity + 1)}
					onChange={(value) => {
						setQuantity((value as number) || 1);
					}}
					onBlur={() => callApiUpdate(quantity)}
					disabled={cart.statusUpdate === 'loading'}
				/>
			</MCol>
			<MCol
				className='text-end'
				span={4}
			>
				<MText>{`${customMoney((item?.price || 0) * (item?.quantity || 0))}`}</MText>
			</MCol>
			<MCol
				span={2}
				className='text-end'
			>
				<MButtonDelete
					title={`Xóa sản phẩm ${item?.product?.name}? `}
					onConfirm={() => dispatch(removingItemToCart(item?._id as string))}
				></MButtonDelete>
			</MCol>
		</MRow>
	);
};

export default CartItem;
