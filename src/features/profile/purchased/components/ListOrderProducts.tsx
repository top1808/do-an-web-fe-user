'use client';

import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MUploadImageMultiple from '@/components/UploadImageMutiple';
import { ProductSKU } from '@/models/productModels';
import { ReviewBody } from '@/models/reviewModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';
import { getProductState, gettingProductPurchared } from '@/redux/reducers/productReducer';
import { creatingReview, getReviewState } from '@/redux/reducers/reviewReducers';
import { customMoney } from '@/utils/FunctionHelpers';
import { Checkbox, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ReviewProduct = {
	isOpenModal: boolean;
	product?: ProductSKU;
};
const ListOrderProducts = () => {
	const products = useAppSelector(getProductState);
	const reviewsState = useAppSelector(getReviewState);
	const auth = useAppSelector(getAuthState);
	const dispatch = useAppDispatch();
	const [productSeletedReview, setProductSeletedReview] = useState<ReviewProduct>({ isOpenModal: false });
	const [form] = Form.useForm();
	const handleSubmitReview = async (value: ReviewBody) => {
		const body: ReviewBody = {
			...value,
			images: value.imageUploads?.map((item) => item?.response?.image || ''),
			customer: auth.currentUserInfo?._id,
			product: productSeletedReview.product?.productCode,
			productSKU: productSeletedReview.product?.productSKUBarcode,
			orderCode: productSeletedReview.product?.orderCode,
			productOrderId: productSeletedReview.product?._id,
		};
		delete body.imageUploads;
		dispatch(creatingReview(body));
	};
	useEffect(() => {
		if (reviewsState.isReviewStatus === 'completed') {
			dispatch(gettingProductPurchared());
			setProductSeletedReview({ isOpenModal: false });
		}
	}, [dispatch, reviewsState.isReviewStatus]);
	useEffect(() => {
		dispatch(gettingProductPurchared());
	}, [dispatch]);
	return (
		<>
			<div className='flex flex-col gap-4'>
				{products.productPurchared && products.productPurchared.length < 1 && (
					<div>
						<p className='text-lg font-semibold'>Hiện tại không có sản phẩm nào để bạn có thể đánh giá. Vui lòng mua/đặt thêm hàng để có thể sử dụng chức năng này !</p>
					</div>
				)}
				{products.productPurchared &&
					products.productPurchared.length > 0 &&
					products.productPurchared?.map((product) => (
						<MRow
							key={product._id}
							gutter={12}
							className='mt-2 shadow-md p-2 py-4 items-center'
						>
							<MCol span={3}>
								<MImage
									className='w-full'
									src={product?.image}
									alt={product.name || 'image'}
								/>
							</MCol>
							<MCol span={10}>
								<div>
									<Link
										href={`/product/${product.productCode}`}
										className='font-semibold'
									>
										{product.productName}
									</Link>
								</div>
								{product?.options?.map((group) => (
									<div key={group?.groupName}>
										<p className='text-gray-500'>
											{group?.groupName}: {group?.option}
										</p>
									</div>
								))}
							</MCol>
							<MCol
								span={3}
								className='text-end'
							>
								{customMoney(product?.price)}
							</MCol>
							<MCol
								span={2}
								className='text-end'
							>
								x{product?.quantity}
							</MCol>
							<MCol
								span={3}
								className='text-end text-red-500 font-semibold'
							>
								= {customMoney((product?.price || 0) * (product?.quantity || 0))}
							</MCol>
							<MCol
								span={3}
								className='text-end text-red-500 font-semibold'
							>
								<MButton
									type='primary'
									onClick={() => {
										form.setFieldsValue({ rate: 5, content: '' });
										setProductSeletedReview({ isOpenModal: true, product: product });
									}}
								>
									Đánh giá
								</MButton>
							</MCol>
						</MRow>
					))}
			</div>
			<Modal
				title={<p className='text-center '>{`Review ${productSeletedReview.product?.productName}`}</p>}
				open={productSeletedReview.isOpenModal}
				onOk={() => form.submit()}
				onCancel={() => setProductSeletedReview({ isOpenModal: false, product: undefined })}
				width={'50%'}
			>
				<Form
					form={form}
					onFinish={handleSubmitReview}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
				>
					<Form.Item<ReviewBody>
						name='rate'
						label='Rate'
					>
						<Rate allowHalf />
					</Form.Item>
					<Form.Item<ReviewBody>
						name='content'
						label='Content'
					>
						<TextArea />
					</Form.Item>
					<MUploadImageMultiple initFileList={[]}>Upload</MUploadImageMultiple>
					<Form.Item<ReviewBody>
						name='isAnonymous'
						label='Anonymous'
						valuePropName='checked'
					>
						<Checkbox checked />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ListOrderProducts;
