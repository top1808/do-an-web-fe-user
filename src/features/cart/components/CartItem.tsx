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
				lg={3}
				xs={8}
			>
				<MImage
					preview={false}
					src={item?.product?.images?.[0]}
					alt={`${item?.product?.name}`}
					height={60}
				/>
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
						<MText>{item?.product?.name}</MText>
						<div>
							{item?.product?.groupOptions?.map((group, index) => (
								<div key={group?.groupName}>
									<p className='text-gray-500'>
										{group?.groupName}: {index === 0 ? item?.productSKU?.option1 : item?.productSKU?.option2}
									</p>
								</div>
							))}
						</div>
					</MCol>
					<MCol
						xs={24}
						lg={4}
					>
						<MText>{`${customMoney(item?.price || 0)}`}</MText>
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
							disabled={cart.statusUpdate === 'loading'}
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
			{/* <MCol
				className='text-end'
				lg={3}
			>
				<MText>{`${customMoney(item?.price || 0)}`}</MText>
			</MCol> */}
		</MRow>
	);
};

export default CartItem;
