import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SliderProps {
	children: React.ReactNode;
	length: number;
	dot?: boolean;
	autoPlay?: boolean;
}

const CustomSlider = (props: SliderProps) => {
	const { children, dot } = props;
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
		slidesToShow: props.length > 6 ? 6 : props.length,
		slidesToScroll: props.length > 6 ? 3 : 1,
		autoplay: props.autoPlay ?? true,
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
					slidesToShow: 2,
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
