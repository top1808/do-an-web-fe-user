'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import SearchFilter from '@/components/SearchFilter';
import React from 'react';
import CardProduct from '../home/components/CardProduct';
import MTitle from '@/components/MTitle';
import MPagination from '@/components/MPagination';
import { PaginationModel } from '@/models/reponseModel';
import { usePathname, useRouter } from 'next/navigation';
import { getSlugFromNameProduct, objectToQueryString } from '@/utils/FunctionHelpers';
import { DiscountProgram } from '@/models/discountProgramModel';
import CountdownTimer from '@/components/CountdownTimer';
import Link from 'next/link';
interface DiscountProgramComponentProps {
	products?: DiscountProgram[];
	pagination?: PaginationModel;
}
const DiscountProgramComponent = (props: DiscountProgramComponentProps) => {
	const { products, pagination } = props;

	const path = usePathname();
	const router = useRouter();
	const onChangePagination = (page: number) => {
		const query = objectToQueryString({ offset: (page - 1) * 12, limit: 12 });
		router.push(path + query);
	};
	return (
		<div>
			<MRow
				gutter={12}
				className='py-8'
			>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={8}
					xl={6}
				>
					<MRow gutter={[16, 16]}>
						{/* <MCol span={24}>
							<SideBarUser />
						</MCol> */}
						<MCol span={24}>
							<SearchFilter />
						</MCol>
					</MRow>
				</MCol>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={16}
					xl={18}
				>
					<MRow gutter={[0, 0]}>
						<MCol span={24}></MCol>
						<MCol span={24}>
							<MRow gutter={[12, 12]}>
								{products ? (
									products?.map((program) => (
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
										</div>
									))
								) : (
									<></>
								)}
							</MRow>
							<div className='w-full text-center mt-4'>
								{products && products.length > 0 && (
									<MPagination
										current={pagination?.page}
										total={pagination?.total}
										onChange={onChangePagination}
										pageSize={12}
									/>
								)}
							</div>
						</MCol>
					</MRow>
				</MCol>
			</MRow>
		</div>
	);
};

export default DiscountProgramComponent;
