import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCartState } from '@/redux/reducers/cartReducer';
import { modalState, toggleModal } from '@/redux/reducers/modalReducer';
import { applyingVoucher, getVoucherState, gettingVouchers } from '@/redux/reducers/voucherReducer';
import { caculatorTotalPrice, customMoney } from '@/utils/FunctionHelpers';
import { Modal, ModalProps } from 'antd';
import React, { useEffect, useState } from 'react';

interface ModalVoucherProps extends ModalProps {}

const ModalVoucher = (props: ModalVoucherProps) => {
	const { ...rest } = props;
	const voucher = useAppSelector(getVoucherState);
	const modal = useAppSelector(modalState);
	const cart = useAppSelector(getCartState);
	const dispatch = useAppDispatch();

	const [selectedVoucher, setSelectedVoucher] = useState<string>('');

	const onApply = () => {
		dispatch(applyingVoucher({ totalProductPrice: caculatorTotalPrice(cart.items), voucherCode: selectedVoucher }));
		dispatch(toggleModal());
	};

	useEffect(() => {
		if (modal.isOpen) {
			dispatch(gettingVouchers());
		}
	}, [dispatch, modal.isOpen]);

	return (
		<Modal
			title='Voucher'
			open={modal.isOpen}
			okText='Áp dụng'
			onCancel={() => dispatch(toggleModal())}
			onOk={onApply}
			confirmLoading={voucher.isApplying}
			{...rest}
		>
			{voucher?.data &&
				voucher.data.map((item) => (
					<MRow
						gutter={[8, 8]}
						key={item._id}
						className={`mt-2 hover:text-blue-400 hover:cursor-pointer shadow-md p-2 py-4 rounded-md ${selectedVoucher === item.code && 'text-blue-600'}`}
						onClick={() => setSelectedVoucher(item.code || '')}
					>
						<MCol span={4}>
							<div className='p-4 bg-lime-500 text-white rounded flex items-center justify-center h-16 text-xl'>{item.type === 'percent' ? '%' : 'VND'}</div>
						</MCol>
						<MCol span={20}>
							<div>
								Giảm giá <strong>{item.type === 'percent' ? item.value + '%' : customMoney(item?.value || 0)}</strong> <br />
								Đơn hàng tối thiểu <strong>{customMoney(item.minOrderValue || 0)}</strong>
							</div>
							{item.type === 'percent' && (
								<div>
									Tối đa <strong>{customMoney(item.maxDiscountValue || 0)}</strong>
								</div>
							)}
						</MCol>
					</MRow>
				))}
		</Modal>
	);
};

export default ModalVoucher;
