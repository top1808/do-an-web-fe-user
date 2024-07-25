import MText from '@/components/MText';
import React from 'react';

const ProductDescription = ({ description, title }: { description: string; title: string }) => {
	return (
		<div className='shadow-md mt-6 p-4 bg-white'>
			<MText
				className='text-xl font-bold'
				style={{ color: 'red' }}
			>
				{title}
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
