import MButton from '@/components/MButton';
import Image from 'next/image';
import React from 'react';
import emptyCart from '../../../../public/images/empty_cart.png';
const CartEmpty = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-8 '>
			<Image
				src={emptyCart}
				alt='empty-cart'
			/>
			<MButton
				type='primary'
				link='/'
			>
				Continue shopping
			</MButton>
		</div>
	);
};

export default CartEmpty;
