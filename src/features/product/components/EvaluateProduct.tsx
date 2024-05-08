import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { Review } from '@/models/reviewModel';
import { formatDate } from '@/utils/FunctionHelpers';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import React from 'react';
type EvaluateProductProps = {
	reviews: Review[];
};

const EvaluateProduct = ({ reviews }: EvaluateProductProps) => {
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
				{reviews.length < 1 ? (
					<div className='p-2'>Chưa có đánh giá</div>
				) : (
					<div className='p-2'>
						{reviews.map((item) => {
							return (
								<MRow
									key={item._id}
									gutter={12}
									className='py-4 px-2'
									style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
								>
									<MCol>
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
									<MCol>
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
															<MCol key={`${item._id}${index}`}>
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
												<MText className='font-medium'>{formatDate(item.createdAt)}</MText>
											</MCol>
											<MCol span={24}>
												<MText>{item.content}</MText>
											</MCol>
										</MRow>
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

export default EvaluateProduct;
