'use client';
import CountdownTimer from '@/components/CountdownTimer';
import MSkeleton from '@/components/MSkeleton';
import MTitle from '@/components/MTitle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { discountProgramState, gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CardProduct from './CardProduct';
import { getSlugFromNameProduct } from '@/utils/FunctionHelpers';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';

const ListProductDiscountProgram = () => {
	const discountProgram = useAppSelector(discountProgramState);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);
	return (
		<MSkeleton loading={discountProgram.loading}>
			{discountProgram?.data &&
				discountProgram?.data?.map((program) => (
					<CountdownTimer
						key={program._id}
						endTime={program.dateEnd as string}
						startTime={program.dateStart as string}
					>
						<div className='flex justify-between border-0 border-b-[1px] border-solid  border-gray-400'>
							<div>
								<MTitle
									level={3}
									underline
								>
									{program.name}
								</MTitle>
							</div>
							<div>
								<Link
									href={'/program-discount'}
									className='underline font-semibold text-orange-500'
								>
									See all
								</Link>
							</div>
						</div>
						<MRow>
							{program.products &&
								program.products.length > 0 &&
								program.products.slice(0, 12).map((item) => (
									<MCol
										span={4}
										key={item._id}
									>
										<CardProduct
											data={item}
											isSale={true}
											link={`/product/${getSlugFromNameProduct({ name: item.name, id: item.productCode })}?barcode=${item.productSKUBarcode}`}
										/>
									</MCol>
								))}
						</MRow>
					</CountdownTimer>
				))}
		</MSkeleton>
	);
};

export default ListProductDiscountProgram;
