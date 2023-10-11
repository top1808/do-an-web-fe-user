import MButton from '@/components/MButton';
import MTitle from '@/components/MTitle';
import Link from 'next/link';
import React from 'react';

const CartEmty = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-8'>
			<MTitle level={2}>Cart is empty</MTitle>
			<MButton type='primary'>
				<Link href={'/'}>Continue shopping</Link>
			</MButton>
		</div>
	);
};

export default CartEmty;
