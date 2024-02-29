import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SliderProps {
	children: React.ReactNode;
	length: number;
	dot?: boolean;
}

const CustomSlider = (props: SliderProps) => {
	const { length, children, dot } = props;
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
		infinite: length > 6,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 2,
					initialSlide: 6,
				},
			},
			{
				breakpoint: 480,
				settings: {
					prevArrow: <></>,
					nextArrow: <></>,
					slidesToShow: 3,
					slidesToScroll: 1,
					initialSlide: 2,
					dots: !dot ? dot : true,
				},
			},
		],
	};
	return (
		<div className='w-full'>
			<Slider
				{...settings}
				className='w-full'
			>
				{children}
			</Slider>
		</div>
	);
};

export default CustomSlider;
