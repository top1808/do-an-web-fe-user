import MText from '@/components/MText';
import parse from 'html-react-parser';
import React from 'react';

const ProductDescription = ({ description }: { description: string }) => {
	return (
		<div className='shadow-md mt-6 p-4 bg-white'>
			<MText
				className='text-xl font-bold'
				style={{ color: 'red' }}
			>
				Mô tả sản phẩm
			</MText>
			<div
				className='p-4 text-base'
				dangerouslySetInnerHTML={{ __html: description }}
			>
				{/* {parse(description)} */}
			</div>
		</div>
	);
};

export default ProductDescription;
