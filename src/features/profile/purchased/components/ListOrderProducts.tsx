'use client';
import reviewApi from '@/api/reviewApi';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { ProductSKU } from '@/models/productModels';
import { ReviewBody } from '@/models/reviewModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';
import { getProductState, gettingProductPurchared } from '@/redux/reducers/productReducer';
import { customMoney } from '@/utils/FunctionHelpers';
import { Checkbox, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ReviewProduct = {
	isOpenModal: boolean;
	product?: ProductSKU;
};
const ListOrderProducts = () => {
	const products = useAppSelector(getProductState);
	const auth = useAppSelector(getAuthState);
	const dispatch = useAppDispatch();
	const [productSeletedReview, setProductSeletedReview] = useState<ReviewProduct>({ isOpenModal: false });
	const [form] = Form.useForm();
	const handleSubmitReview = async (value: ReviewBody) => {
		const body: ReviewBody = {
			...value,
			customer: auth.currentUserInfo?._id,
			product: productSeletedReview.product?._id,
			productSKU: productSeletedReview.product?.productSKUBarcode,
			orderCode: productSeletedReview.product?.orderCode,
		};
		const res = await reviewApi.createReview(body);
		if (res.status === 200) {
			setProductSeletedReview({ isOpenModal: false, product: undefined });
			// xu ly hien thi lai
			// dispatch(gettingProductPurchared());
			toast.success('Review successfully !');
		} else {
			toast.error('Review failed !');
		}
	};

	useEffect(() => {
		dispatch(gettingProductPurchared());
	}, [dispatch]);
	return (
		<>
			<div className='flex flex-col gap-4'>
				{products.productPurchared &&
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
							<MCol span={12}>
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
								span={2}
								className='text-end'
							>
								Giá: {customMoney(product?.price)}
							</MCol>
							<MCol
								span={2}
								className='text-end'
							>
								Quantity: {product?.quantity}
							</MCol>
							<MCol
								span={2}
								className='text-end text-red-500 font-semibold'
							>
								{customMoney((product?.price || 0) * (product?.quantity || 0))}
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
								{/* {product.isReviewed ? (
									<MButton
										disabled
										type='primary'
									>
										Đã đánh giá
									</MButton>
								) : (
									<MButton
										type='primary'
										onClick={() => {
											form.setFieldsValue({ rate: 5, content: '' });
											setproductSeletedReview({ isOpenModal: true, product: product });
										}}
									>
										Đánh giá
									</MButton>
								)} */}
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
