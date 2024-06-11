'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import ItemCategories from '../home/components/ItemCategories';
import CustomSlider from '@/components/CustomSlider';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MSkeleton from '@/components/MSkeleton';
import { useEffect } from 'react';
const ListCategories = () => {
	const category = useAppSelector(getCategoryState);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);
	return (
		<MSkeleton loading={category.loading}>
			<MRow className='xs:mb-6 md:mb-0 bg-white px-2 '>
				<MCol
					span={24}
					className='py-4'
				>
					<h3 className='text-2xl font-semibold'>{'Categories'}</h3>
				</MCol>
				<MCol
					span={24}
					className='px-1'
				>
					{category.data && category.data.length > 0 && (
						<CustomSlider
							length={category.data?.length}
							autoPlay={false}
						>
							{category.data.map((item) => {
								return (
									<ItemCategories
										key={item._id}
										data={item}
									/>
								);
							})}
						</CustomSlider>
					)}
				</MCol>
			</MRow>
		</MSkeleton>
	);
};

export default ListCategories;
