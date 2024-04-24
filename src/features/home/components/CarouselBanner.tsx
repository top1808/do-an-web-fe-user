import { Carousel } from 'antd';
import React from 'react';
import banner1 from '../../../../public/images/banner1.jpeg';
import banner2 from '../../../../public/images/banner2.jpeg';
import banner3 from '../../../../public/images/banner3.png';
import MImage from '@/components/MImage';

const CarouselBanner = async () => {
	// fetch server
	return (
		//
		<div className='bg-white px-0 md:px-10 xl:px-32 py-8'>
			<Carousel
				effect='fade'
				autoplay
				easing='ease-in-out'
			>
				<MImage
					width='100%'
					src={banner1.src}
					alt='banner'
					preview={false}
				/>
				<MImage
					width='100%'
					src={banner2.src}
					alt='banner'
					preview={false}
				/>
				<MImage
					width='100%'
					src={banner3.src}
					alt='banner'
					preview={false}
				/>
			</Carousel>
		</div>
	);
};

export default CarouselBanner;
