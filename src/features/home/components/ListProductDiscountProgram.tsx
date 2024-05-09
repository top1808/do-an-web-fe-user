'use client';
import CountdownTimer from '@/components/CountdownTimer';
import CustomSlider from '@/components/CustomSlider';
import MSkeleton from '@/components/MSkeleton';
import MTitle from '@/components/MTitle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { discountProgramState, gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CardProduct from './CardProduct';

const ListProductDiscountProgram = () => {
	const discountProgram = useAppSelector(discountProgramState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);
	return (
		<MSkeleton loading={discountProgram.loading}>
			{discountProgram?.data ? (
				discountProgram?.data?.map((program) => (
					<div
						key={program._id}
						className='py-4 px-2 bg-white'
					>
						<CountdownTimer
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
										href={'/'}
										className='underline font-semibold text-orange-500'
									>
										See all
									</Link>
								</div>
							</div>
							{program.products && program.products.length > 0 && (
								<CustomSlider length={program.products.length}>
									{program.products
										// ?.sort((a, b) => (b?.soldQuantityOfProduct || 0) - (a?.soldQuantityOfProduct || 0))
										?.slice(0, 6)
										.map((item) => (
											<CardProduct
												data={item}
												key={item._id}
												isSale={true}
												link={`/product/${item.productCode!}?barcode=${item.productSKUBarcode}`}
											/>
										))}
								</CustomSlider>
							)}
						</CountdownTimer>
					</div>
				))
			) : (
				<></>
			)}
		</MSkeleton>
	);
};

export default ListProductDiscountProgram;
