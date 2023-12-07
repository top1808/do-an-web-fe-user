import { Carousel } from 'antd';
import React from 'react';
import banner1 from '../../../../public/images/banner1.jpeg';
import banner2 from '../../../../public/images/banner2.jpeg';
import banner3 from '../../../../public/images/banner3.png';
import MImage from '@/components/MImage';

const CarouselBanner = () => {
	const onChange = (currentSlide: number) => {};
	return (
		<Carousel
			effect='fade'
			autoplay
			afterChange={onChange}
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
	);
};

export default CarouselBanner;
