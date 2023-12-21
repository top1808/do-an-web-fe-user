import { Product } from '@/models/productModels';
import Slider from 'react-slick';
import CardProduct from './CardProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
interface SliderProductsProps {
	data: Product[];
}

const SliderProducts = (props: SliderProductsProps) => {
	const { data } = props;
	const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
		<button
			{...props}
			aria-hidden='true'
			aria-disabled={currentSlide === 0 ? true : false}
			type='button'
		>
			<FontAwesomeIcon
				icon={faChevronLeft}
				className='text-4xl'
				color='black'
			/>
		</button>
	);
	const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
		<button
			{...props}
			aria-hidden='true'
			aria-disabled={currentSlide === slideCount - 1 ? true : false}
			type='button'
		>
			<FontAwesomeIcon
				className='text-4xl'
				color='black'
				icon={faChevronRight}
			/>
		</button>
	);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
	};
	return (
		<div className='w-full'>
			<MTitle
				level={3}
				className='p-2'
			>
				Xu hướng
			</MTitle>
			<Slider
				{...settings}
				className='w-full py-2'
			>
				{data &&
					data.map((item, index) => {
						return (
							<CardProduct
								key={index}
								data={item}
							/>
						);
					})}
			</Slider>
		</div>
	);
};

export default SliderProducts;
