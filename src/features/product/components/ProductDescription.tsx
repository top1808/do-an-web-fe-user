import MText from '@/components/MText';
import MTitle from '@/components/MTitle';

import React from 'react';

const ProductDescription = ({ description }: { description: string }) => {
	return (
		<div className='shadow-xl mt-6 p-4'>
			<MText
				className='text-xl font-bold'
				style={{ color: 'red' }}
			>
				Mô tả sản phẩm
			</MText>
			<div className='p-4'>
				<MText className='text-base'>{description}</MText>
			</div>
		</div>
	);
};

export default ProductDescription;
