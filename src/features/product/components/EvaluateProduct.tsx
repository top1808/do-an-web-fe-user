import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { Review } from '@/models/reviewModel';
import { formatDate } from '@/utils/FunctionHelpers';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import Image from 'next/image';
import React from 'react';
type EvaluateProductProps = {
	reviews?: Review[];
};

const EvaluateProduct = ({ reviews }: EvaluateProductProps) => {
	return (
		<div className='shadow-xl mt-4'>
			<MTitle
				level={3}
				className='p-2'
				style={{ color: 'red' }}
			>
				Đánh giá sản phẩm
			</MTitle>
			<div className='p-2'>
				{reviews?.map((item) => {
					return (
						<MRow
							key={item._id}
							gutter={12}
							className='py-4 px-2'
							style={{ borderTop: '1px solid rgb(200, 210, 227)' }}
						>
							<MCol>
								<div className='rounded-full bg-slate-200 p-3 text-center w-[50px]'>
									<FontAwesomeIcon
										icon={faUser}
										size='lg'
									/>
								</div>
							</MCol>
							<MCol>
								<MRow>
									<MCol span={24}>
										<MText
											style={{ fontSize: '1rem' }}
											className='font-bold'
										>
											{'Le top'}
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
						</MRow>
					);
				})}
			</div>
		</div>
	);
};

export default EvaluateProduct;
