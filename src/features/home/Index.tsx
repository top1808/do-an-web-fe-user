import ListProducts from './components/ListProducts';
import ListCategories from '../components/ListCategories';
import CarouselBanner from './components/CarouselBanner';
import ListProductDiscountProgram from './components/ListProductDiscountProgram';
import ListProductTopSales from './components/ListProductTopSales';
const HomeUserComponent = () => {
	return (
		<div className='flex flex-col gap-4 mb-4'>
			<CarouselBanner />
			<ListCategories />
			<ListProductDiscountProgram />
			<ListProductTopSales />
			<ListProducts />
		</div>
	);
};

export default HomeUserComponent;
