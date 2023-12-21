'use client';
import MImage from '@/components/MImage';
import { Category } from '@/models/categoryModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Menu, type MenuProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import iconAll from '../../public/icons/all.png';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const SideBarUser: React.FC = () => {
	const dispatch = useAppDispatch();
	const { category } = useAppSelector((state) => state);
	const searchParams = useSearchParams();

	const items: MenuItem[] =
		category.data?.map((item: Category) =>
			getItem(
				<Link
					href={'/product?category=' + item._id}
					className='flex gap-2 align-middle'
				>
					<MImage
						width={30}
						height={30}
						src={item?.image}
						preview={false}
					/>
					{item.name}
				</Link>,
				item._id,
			),
		) || [];

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	return (
		<>
			<Menu
				style={{ borderInlineEnd: 'none', padding: '10px' }}
				mode='vertical'
				className='rounded-md font-semibold'
				items={[
					getItem(
						<Link
							href={'/product?category=all'}
							className='flex gap-2 align-middle'
						>
							<MImage
								width={30}
								height={30}
								src={iconAll.src}
								preview={false}
							/>
							ALL
						</Link>,
						'all',
					),
					...items,
				]}
				selectedKeys={[searchParams?.get('category') || '']}
			></Menu>
		</>
	);
};

export default SideBarUser;
