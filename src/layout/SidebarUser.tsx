'use client';
import MImage from '@/components/MImage';
import { Category } from '@/models/categoryModels';
import { useAppSelector } from '@/redux/hooks';
import { Menu, type MenuProps } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import iconAll from '../../public/icons/all.png';

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
	const { category } = useAppSelector((state) => state);
	const searchParams = useSearchParams();
	const router = useRouter();

	const items: MenuItem[] =
		category.data?.map((item: Category) =>
			getItem(
				<div className='flex gap-2 align-middle'>
					<MImage
						width={30}
						height={30}
						src={item?.image}
						preview={false}
					/>
					{item.name}
				</div>,
				item._id,
			),
		) || [];

	const onClick: MenuProps['onClick'] = (e) => {
		router.replace('/product?category=' + e.key);
	};

	return (
		<>
			<Menu
				style={{ borderInlineEnd: 'none', padding: '10px' }}
				mode='vertical'
				onClick={onClick}
				className='rounded-md font-semibold'
				items={[
					getItem(
						<div className='flex gap-2 align-middle'>
							<MImage
								width={30}
								height={30}
								src={iconAll.src}
								preview={false}
							/>
							ALL
						</div>,
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
