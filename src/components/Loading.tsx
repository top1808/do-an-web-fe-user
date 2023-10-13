import React from 'react';
import MSpin from './MSpin';

const Loading = () => {
	return (
		<div className='w-screen h-screen flex items-center justify-center opacity-60'>
			<MSpin size='large'></MSpin>
		</div>
	);
};

export default Loading;
