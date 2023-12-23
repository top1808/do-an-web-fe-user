import React from 'react';
import MSpin from './MSpin';

const Loading = () => {
	return (
		<div
			className='flex items-center justify-center absolute top-0 left-0 bottom-0 right-0'
			style={{ zIndex: 99999 }}
		>
			<MSpin size='large'></MSpin>
		</div>
	);
};

export default Loading;
