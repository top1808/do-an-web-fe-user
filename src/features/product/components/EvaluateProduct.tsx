'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { Review } from '@/models/reviewModel';
import { filterReviewsByRating, formatDate } from '@/utils/FunctionHelpers';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import MButton from '@/components/MButton';
import { useTranslations } from 'next-intl';

type EvaluateProductProps = {
	reviews: Review[];
	rate: number;
};
type FilterRating = {
	label: React.ReactNode | string;
	value: number;
};
const EvaluateProduct = ({ reviews, rate }: EvaluateProductProps) => {
	const t = useTranslations('Product');

	const ratesArray: FilterRating[] = [
		{
			label: 'Tất cả',
			value: -1,
		},
		{
			label: '5 Sao',
			value: 5,
		},
		{
			label: '4 Sao',
			value: 4,
		},
		{
			label: '3 Sao',
			value: 3,
		},
		{
			label: '2 Sao',
			value: 2,
		},
		{
			label: '1 Sao',
			value: 1,
		},
	];
	const [filterRate, setFilterRate] = useState<number>(-1);

	const [data, setData] = useState<Review[]>([]);
	const onLoadMore = () => {
		// call api load more
		// .....
		// temp use data client
		setData((prev) => [...prev, ...filterReviewsByRating(reviews, filterRate).slice(prev.length, prev.length + 3)]);
	};
	// Button loadMore
	const loadMore =
		data.length < reviews.length ? (
			<div
				style={{
					textAlign: 'center',
					marginTop: 12,
					height: 32,
					lineHeight: '32px',
				}}
			>
				<MButton onClick={() => onLoadMore()}>loading more</MButton>
			</div>
		) : null;
	useEffect(() => {
		// call api load more
		// .....
		// temp use data client
		setData(filterReviewsByRating(reviews, filterRate).slice(0, 3) || []);
	}, [filterRate, reviews]);
	return (
		<>
			<div className='shadow-xl mt-4 bg-white'>
				<MTitle
					level={3}
					className='p-2'
					style={{ color: 'red' }}
				>
					{t('Review.Title')}
				</MTitle>
				<div className='flex justify-end px-2'></div>
				{reviews.length < 1 ? (
					<div className='p-2'>{t('Review.NoReview')}</div>
				) : (
					<div className='p-2'>
						<MRow gutter={[16, 16]}>
							<MCol span={24}>
								<div className='px-4 flex flex-col gap-4'>
									<div>
										<h3 className='text-xl'>
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
									<div className='flex gap-4'>
										{ratesArray.map((r) => (
											<div
												className='flex gap-4 items-center'
												key={r.value}
											>
												<MButton
													disabled={r.value !== -1 && filterReviewsByRating(reviews, r.value).length === 0}
													onClick={() => setFilterRate(r.value)}
												>{`${r.label} (${filterReviewsByRating(reviews, r.value).length || 0})`}</MButton>
											</div>
										))}
									</div>
								</div>
							</MCol>
							<MCol span={24}>
								<List
									className='demo-loadmore-list'
									loading={false}
									itemLayout='horizontal'
									loadMore={loadMore}
									dataSource={data}
									renderItem={(item) => (
										<List.Item key={item._id}>
											<MRow
												className='py-4 px-2 w-full'
												justify={'start'}
											>
												<MCol span={2}>
													{item.customer?.image ? (
														<MImage
															src={item.customer?.image}
															width={50}
															height={50}
															preview={false}
															style={{ borderRadius: '999px' }}
														/>
													) : (
														<div className='rounded-full bg-slate-200 p-3 text-center w-[50px] h-[50px]'>
															<FontAwesomeIcon
																icon={faUser}
																size='lg'
															/>
														</div>
													)}
												</MCol>
												<MCol
													xl={22}
													xs={24}
												>
													<MRow>
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
														<MCol span={24}>
															{item.images && item.images.length > 0 && (
																<MRow justify={'start'}>
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
															)}
														</MCol>
														<MCol span={24}>
															<MText>{item.content}</MText>
														</MCol>
													</MRow>
												</MCol>
											</MRow>
										</List.Item>
									)}
								/>
								{/* {filterReviewsByRating(reviews, filterRate).map((item) => {
									return (
										<MRow
											key={item._id}
											className='py-4 px-2'
											justify={'start'}
											style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
										>
											<MCol span={2}>
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
											<MCol
												xl={22}
												xs={24}
											>
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
								})} */}
							</MCol>
						</MRow>
					</div>
				)}
			</div>
		</>
	);
};

export default EvaluateProduct;
