import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { ProductGroupOption } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectOption } from '@/redux/reducers/productReducer';
import React from 'react';

interface ProductOptionsProps {
	groupOptions?: ProductGroupOption[];
}

const ProductOptions = (props: ProductOptionsProps) => {
	const { groupOptions } = props;
	const product = useAppSelector((state) => state.product);

	const dispatch = useAppDispatch();

	return (
		<div>
			{groupOptions?.map((group, index) => (
				<div
					key={group?.groupName}
					className='mb-4'
				>
					<div className='text-base font-medium'>{group.groupName}</div>
					<MRow gutter={[8, 8]}>
						{group?.options?.map((option) => (
							<MCol
								span={4}
								key={option}
							>
								<div
									onClick={() => dispatch(selectOption({ index, option }))}
									className={`border border-solid border-gray-400 rounded p-2 text-center cursor-pointer hover:border-orange-400 hover:text-orange-400 ${
										product?.options?.[index] === option && 'border-orange-400 text-orange-400'
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
