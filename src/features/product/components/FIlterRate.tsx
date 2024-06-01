import { Slider } from 'antd';
import React from 'react';
type PropsFilterRate = {
	totalReview: number;
	title: string;
	displayCountReview: number;
	color?: string;
};
const FIlterRate = ({ displayCountReview, title, totalReview, color }: PropsFilterRate) => {
	return (
		<>
			<p>{`${title}`}</p>
			<div className='flex gap-2 items-center'>
				<Slider
					min={0}
					max={totalReview}
					className='w-[150px] '
					value={displayCountReview}
					disabled
				/>
				<div>
					<p>{`(${displayCountReview})`}</p>
				</div>
			</div>
		</>
	);
};

export default FIlterRate;
