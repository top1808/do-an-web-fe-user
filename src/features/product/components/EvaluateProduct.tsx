'use client';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';

import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { Review } from '@/models/reviewModel';
import { filterReviewsByRating, formatDate } from '@/utils/FunctionHelpers';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import FIlterRate from './FIlterRate';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type EvaluateProductProps = {
	reviews: Review[];
	rate: number;
};

const EvaluateProduct = ({ reviews, rate }: EvaluateProductProps) => {
	const ratesArray = [5, 4, 3, 2, 1];
	const [filterRate, setFilterRate] = useState<number[]>([]);
	const handleOnChangeFilterRate = (e: CheckboxChangeEvent, r: number) => {
		if (e.target.checked) {
			if (!filterRate.includes(r)) {
				const ratesTemp = [...filterRate];
				ratesTemp.push(r);
				setFilterRate(ratesTemp);
			}
		} else {
			const temp = [...filterRate];
			setFilterRate(temp.filter((item) => item !== r));
		}
	};
	return (
		<>
			<div className='shadow-xl mt-4 bg-white'>
				<MTitle
					level={3}
					className='p-2'
					style={{ color: 'red' }}
				>
					Đánh giá sản phẩm
				</MTitle>
				<div className='flex justify-end px-2'></div>
				{reviews.length < 1 ? (
					<div className='p-2'>Chưa có đánh giá</div>
				) : (
					<div className='p-2'>
						<MRow gutter={[16, 16]}>
							<MCol span={14}>
								{filterReviewsByRating(reviews, filterRate).map((item) => {
									return (
										<MRow
											key={item._id}
											className='py-4 px-2'
											justify={'start'}
											style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
										>
											<MCol span={3}>
												{item.customer?.image ? (
													<MImage
														src={item.customer?.image}
														width={60}
														height={60}
														preview={false}
														style={{ borderRadius: '999px' }}
													/>
												) : (
													<div className='rounded-full bg-slate-200 p-3 text-center w-[50px]'>
														<FontAwesomeIcon
															icon={faUser}
															size='lg'
														/>
													</div>
												)}
											</MCol>
											<MCol span={21}>
												<MRow gutter={[16, 0]}>
													<MCol span={24}>
														<MText
															style={{ fontSize: '1rem' }}
															className='font-bold'
														>
															{item.customer?.name || 'Ẩn danh'}
														</MText>
													</MCol>
													<MCol span={24}>
														<MText
															style={{ fontSize: '0.8rem' }}
															className='font-semibold'
														>
															{formatDate(item.createdAt) || ''}
														</MText>
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
																	<MCol
																		key={`${item._id}${index}`}
																		span={8}
																	>
																		<MImage
																			src={i}
																			alt={`${item._id}${index}`}
																			height={120}
																		/>
																	</MCol>
																))}
															</MRow>
														</MCol>
													)}
													<MCol span={24}>
														<MText>{item.content}</MText>
													</MCol>
												</MRow>
											</MCol>
										</MRow>
									);
								})}
							</MCol>
							<MCol span={10}>
								<div className='px-4'>
									<div>
										<h3>
											{rate}
											<span>
												<FontAwesomeIcon
													icon={faStar}
													color='yellow'
												/>
											</span>
											{`(${reviews.length} reviews)`}
										</h3>
									</div>
									<div>
										{ratesArray.map((r) => (
											<div
												className='flex gap-4 items-center'
												key={r}
											>
												<MCheckbox
													disabled={reviews.filter((item) => item.rate === r).length < 1}
													onChange={(e) => handleOnChangeFilterRate(e, r)}
												/>
												<FIlterRate
													title={`${r} star`}
													totalReview={reviews.length || 0}
													displayCountReview={reviews.filter((item) => item.rate === r).length || 0}
												/>
											</div>
										))}
									</div>
								</div>
							</MCol>
						</MRow>
					</div>
				)}
			</div>
		</>
	);
};

export default EvaluateProduct;
