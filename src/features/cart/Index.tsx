'use client';

import MTitle from '@/components/MTitle';
import { useEffect } from 'react';
import CustomSteps from './components/StepsPayment';
import TableCartProducts from './components/TableCartProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartEmty from './components/CartEmty';
import { gettingCart, paying, setIPCustomer } from '@/redux/reducers/cartReducer';
import Loading from '@/components/Loading';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CartPageComponent = () => {
	const { cart } = useAppSelector((state) => state);
	const searchParams = useSearchParams();
	const res = searchParams.get('vnp_ResponseCode');
	const isFail = res && res !== '00' ? true : false;
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingCart());
		fetch('https://ipinfo.io/json?token=58ee6c1d3e9323')
			.then((response) => response.json())
			.then((data) => {
				dispatch(setIPCustomer(data.ip));
			})
			.catch((error) => console.error('Error fetching IP:', error));
		if (isFail && res === '24') {
			toast.warning('Bạn đã hủy giao dịch !');
			localStorage.removeItem('tempDataPayement');
		} else if (!isFail && res === '00') {
			const dataPayment = JSON.parse(localStorage.getItem('tempDataPayement')!);
			dataPayment.vnpayTransactionNo = searchParams.get('vnp_TransactionNo');
			dispatch(paying(dataPayment));
		}
	}, [dispatch, isFail, res, searchParams]);
	useEffect(() => {
		if (cart.payingStatus === 'completed' && cart.orderInfo) {
			Swal.fire({
				html: `Mã đơn hàng của bạn là <a color="blue" href='/profile/purchased'>${cart.orderInfo?.orderCode}</a>`,
				title: 'Thanh toán thành công',
				icon: 'success',
				confirmButtonText: 'Tiếp tục mua sắm',
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.assign('/');
				}
			});
		} else if (cart.payingStatus === 'failed') {
			Swal.fire({
				title: 'Thanh toán thất bại',
				text: 'Có lỗi xảy ra trong quá trình thanh toán',
				icon: 'error',
				confirmButtonText: 'Ẩn',
			});
		}
		localStorage.removeItem('tempDataPayement');
	}, [cart.orderInfo, cart.payingStatus]);
	return (
		<>
			{(cart?.loading || cart.statusUpdate === 'loading') && <Loading />}

			<div className='py-8'>
				<MTitle level={2}>My cart</MTitle>
				<div>
					{cart?.items?.length < 1 ? (
						<CartEmty />
					) : (
						<CustomSteps isFail={res && res !== '00' ? true : false}>
							<TableCartProducts data={cart?.items} />
						</CustomSteps>
					)}
				</div>
			</div>
		</>
	);
};

export default CartPageComponent;
