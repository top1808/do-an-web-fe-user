'use client';
import MImage from '@/components/MImage';
import { Category } from '@/models/categoryModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Menu, type MenuProps } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import iconAll from '../../public/icons/all.png';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import Link from 'next/link';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFilter } from '@fortawesome/free-solid-svg-icons';

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
	const category = useAppSelector(getCategoryState);
	const searchParams = useSearchParams();
	const [sizeDevice, setSizeDevice] = useState(document.documentElement.clientWidth);
	window.onresize = () => setSizeDevice(window.innerWidth);
	const items: MenuItem[] =
		category.data?.map((item: Category) =>
			getItem(
				<Link
					href={'/product?category=' + item._id}
					className='flex gap-2 align-middle'
				>
					<MImage
						width={sizeDevice > 576 ? 30 : 20}
						height={sizeDevice > 576 ? 30 : 20}
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
			<MRow gutter={[16, 16]}>
				<MCol span={24}>
					<div className='text-xl font-semibold'>
						<FontAwesomeIcon
							icon={faBars}
							className='mr-2'
						/>
						Categories
					</div>
				</MCol>
				<MCol span={24}>
					<Menu
						style={{ borderInlineEnd: 'none', padding: '10px' }}
						mode={sizeDevice > 768 ? 'vertical' : 'horizontal'}
						className='rounded-md font-semibold'
						items={[
							getItem(
								<Link
									href={'/product?category=all'}
									className='flex gap-2 align-middle'
								>
									<MImage
										width={sizeDevice > 576 ? 30 : 20}
										height={sizeDevice > 576 ? 30 : 20}
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
					/>
				</MCol>
			</MRow>
		</>
	);
};

export default SideBarUser;
