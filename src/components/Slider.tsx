'use client';
import { Carousel } from 'antd';
import MButton from './MButton';
import { useRef } from 'react';
import { CarouselRef } from 'antd/es/carousel';

export default function SliderProducts() {
	const contentStyle: React.CSSProperties = {
		height: '160px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',
	};
	const carouselRef = useRef<CarouselRef>(null);
	const ref = useRef<HTMLDivElement>(null);
	return (
		<>
			<div
				className='relative'
				ref={ref}
			>
				<Carousel
					dots={false}
					ref={carouselRef}
				>
					<div>
						<h3 style={contentStyle}>1</h3>
					</div>
					<div>
						<h3 style={contentStyle}>2</h3>
					</div>
					<div>
						<h3 style={contentStyle}>3</h3>
					</div>
					<div>
						<h3 style={contentStyle}>4</h3>
					</div>
				</Carousel>
				<MButton
					className='absolute w-4 h-4 top-8 left-0'
					onClick={() => carouselRef.current?.prev()}
				>
					concac
				</MButton>
				<MButton
					className='absolute w-4 h-4 top-8 right-0'
					onClick={() => carouselRef.current?.next()}
				>
					concac
				</MButton>
			</div>
		</>
	);
}
