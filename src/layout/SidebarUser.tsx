'use client';
import MImage from '@/components/MImage';
import { Category } from '@/models/categoryModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import { Menu, type MenuProps } from 'antd';
import React, { useEffect } from 'react';

const SideBarUser: React.FC = () => {
	const dispatch = useAppDispatch();
	const { category } = useAppSelector((state) => state);
	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};
	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	return (
		<>
			<Menu
				style={{ borderInlineEnd: 'none', padding: '10px' }}
				defaultSelectedKeys={['dashboard']}
				mode='inline'
				onClick={onClick}
				className='rounded-md font-semibold'
			>
				{category.data?.map((item: Category) => {
					return (
						<Menu.Item
							style={{ height: '50px', padding: '2.4rem 1rem' }}
							key={item._id}
							icon={
								<div className='flex items-center py-4'>
									<MImage
										width={60}
										height={60}
										src={item?.image}
										preview={false}
									/>
								</div>
							}
						>
							{item.name}
						</Menu.Item>
					);
				})}
			</Menu>
		</>
	);
};

export default SideBarUser;
