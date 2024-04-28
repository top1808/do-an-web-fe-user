'use client';

import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getReviewState, gettingReviews } from '@/redux/reducers/reviewReducers';
import { customMoney, formatDate } from '@/utils/FunctionHelpers';
import { Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ReviewsComponent = () => {
	const dispatch = useAppDispatch();
	const reviewState = useAppSelector(getReviewState);

	useEffect(() => {
		dispatch(gettingReviews());
	}, [dispatch]);
	return (
		<>
			<div className='flex flex-col gap-4'>
				{reviewState.data && reviewState.data.length < 1 && (
					<div>
						<p className='text-lg font-semibold'>
							Bạn chưa có đánh giá nào !
							<span>
								<Link
									href={'/profile/product-purchased'}
									className='text-blue-600'
								>
									Nhấn vào đây để đánh giá
								</Link>
							</span>
						</p>
					</div>
				)}
				{reviewState.data && reviewState.data.length > 1 && (
					<>
						<MTitle level={3}>Đánh giá</MTitle>
						<div>
							{reviewState.data.map((item) => {
								return (
									<MRow
										key={item._id}
										gutter={12}
										className='py-4 px-2'
										style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
									>
										<MCol span={6}>
											<MRow>
												<MCol span={24}>
													<p>{`${item.customer?.name || ''}`}</p>
												</MCol>
												<MCol span={24}>
													<Rate
														disabled
														defaultValue={item.rate}
														allowHalf
													/>
												</MCol>
												{item.images && item.images.length > 0 && (
													<MCol span={24}>
														<MRow gutter={[16, 16]}>
															{item.images.map((i, index) => (
																<Image
																	key={`${item._id}${index}`}
																	src={i}
																	alt={`${item._id}${index}`}
																/>
															))}
														</MRow>
													</MCol>
												)}
												<MCol span={24}>
													<MText className='font-medium'>{formatDate(item.createdAt)}</MText>
												</MCol>
											</MRow>
										</MCol>
										<MCol span={18}>
											<MRow gutter={8}>
												<MCol span={3}>
													<MImage
														src={item.product?.images?.[0] || ''}
														alt={item.product?.name}
													/>
												</MCol>
												<MCol span={21}>
													<div>
														<p>{item?.product?.name}</p>
													</div>
													<div>
														{item?.productSKU?.options?.map((group) => (
															<div key={group?.groupName}>
																<p className='text-gray-500'>
																	{group?.groupName}: {group?.option}
																</p>
															</div>
														))}
													</div>

													<div>
														<p>{`Giá: ${customMoney(item?.productSKU?.price)}`}</p>
													</div>
												</MCol>
											</MRow>
										</MCol>
										<MCol
											span={24}
											className='mt-2'
										>
											<MText>{item.content}</MText>
										</MCol>
									</MRow>
								);
							})}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ReviewsComponent;
