'use client';
import React, { useRef } from 'react';
import { Carousel, Row } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import MButton from '@/components/MButton';

export const SliderCarousel = () => {
	const carouselRef = useRef<CarouselRef>(null);
	return (
		<div>
			<Row style={{ marginBottom: 10 }}>
				<MButton
					onClick={() => {
						if (carouselRef.current) carouselRef.current.next();
					}}
				>
					next
				</MButton>
				<MButton
					onClick={() => {
						if (carouselRef.current) carouselRef.current.prev();
					}}
				>
					pre
				</MButton>
			</Row>

			<Carousel
				dots={false}
				ref={carouselRef}
			>
				<div>
					<h3>0</h3>
				</div>
				<div>
					<h3>1</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
			</Carousel>
		</div>
	);
};
