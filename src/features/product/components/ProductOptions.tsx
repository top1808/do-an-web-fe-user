import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { ProductGroupOption } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectOption } from '@/redux/reducers/productReducer';
import { compareString } from '@/utils/FunctionHelpers';

import React from 'react';

interface ProductOptionsProps {
	groupOptions?: ProductGroupOption[];
	productsSKUSales?: string[];
}

const ProductOptions = ({ groupOptions, productsSKUSales }: ProductOptionsProps) => {
	const product = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();
	const handleChoiceOption = (index: number, option: string) => {
		dispatch(selectOption({ index, option }));
	};
	return (
		<div>
			{groupOptions?.map((group, index) => (
				<div
					key={group?.groupName}
					className='mb-4 relative'
				>
					<div className='text-base font-medium'>{group.groupName}</div>
					<MRow gutter={[8, 8]}>
						{group?.options?.map((option) => (
							<MCol
								xs={8}
								lg={6}
								key={option}
							>
								{productsSKUSales && productsSKUSales.includes(option?.toLowerCase()) && (
									<div className='absolute top-1 right-2 bg-red-500'>
										<p className='text-xs text-white px-[2px]'>Sale</p>
									</div>
								)}
								<div
									onClick={() => handleChoiceOption(index, option)}
									className={` border border-solid border-gray-400 rounded p-2 text-center cursor-pointer hover:border-orange-400 hover:text-orange-400 ${
										compareString(product?.options?.[index], option) && 'border-orange-400 text-orange-400'
									}`}
								>
									{option}
								</div>
							</MCol>
						))}
					</MRow>
				</div>
			))}
		</div>
	);
};

export default ProductOptions;
