'use client';
import ListProducts from './components/ListProducts';
import ListCategories from '../components/ListCategories';
import CarouselBanner from './components/CarouselBanner';
import ListProductDiscountProgram from './components/ListProductDiscountProgram';
import ListProductTopSales from './components/ListProductTopSales';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';
import Swal from 'sweetalert2';
const HomeUserComponent = () => {
	const auth = useAppSelector(getAuthState);

	useEffect(() => {
		if (auth?.currentUserInfo?.name?.toLowerCase() === 'no name') {
			Swal.fire({
				icon: 'info',
				text: 'Vui lòng cập nhật thông tin của bạn.',
				confirmButtonText: 'Cập nhật',
			}).then(() => {
				window.location.assign('/profile');
			});
		}
	}, [auth?.currentUserInfo?.name]);

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
