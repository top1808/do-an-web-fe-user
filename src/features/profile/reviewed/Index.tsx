'use client';

import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getReviewState, gettingReviews } from '@/redux/reducers/reviewReducers';
import { formatDate } from '@/utils/FunctionHelpers';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ReviewsComponent = () => {
	const dispatch = useAppDispatch();
	const reviewState = useAppSelector(getReviewState);
	console.log(reviewState.data);
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
								<Link href={'/profile/product-purchased'}> Nhấn vào đây để đánh giá</Link>
							</span>
						</p>
					</div>
				)}
				{reviewState.data && reviewState.data.length > 1 && (
					<div>
						{reviewState.data.map((item) => {
							return (
								<MRow
									key={item._id}
									gutter={12}
									className='py-4 px-2'
									style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
								>
									<MCol span={12}>
										<MRow>
											<MCol span={24}>
												<p>{`${item.isAnonymous ? 'Ẩn danh' : 'Không ẩn danh'}`}</p>
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
											<MCol span={24}>
												<MText>{item.content}</MText>
											</MCol>
										</MRow>
									</MCol>
									<MCol span={12}>
										<MRow>{`Order code: ${item.orderCode}`}</MRow>
										<MRow>{`Product code: ${item.product}`}</MRow>
									</MCol>
								</MRow>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default ReviewsComponent;
