'use client';
import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { faBell, faBox, faClockRotateLeft, faHandMiddleFinger, faKey, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SideBarProfile = () => {
	const [sizeDevice, setSizeDevice] = useState(document.documentElement.clientWidth);
	window.onresize = () => setSizeDevice(window.innerWidth);
	const t = useTranslations('ProfilePage');
	const path = usePathname();
	const listItem = [
		{
			title: t('Account'),
			icon: (
				<Link href={'/profile'}>
					<FontAwesomeIcon
						color='blue'
						icon={faUser}
					/>
				</Link>
			),
		},
		{
			title: t('ChangePassword'),
			icon: (
				<Link href={'/profile/change-password'}>
					<FontAwesomeIcon
						color='#EBB636'
						icon={faKey}
					/>
				</Link>
			),
		},
		{
			title: t('Notification'),
			icon: (
				<Link href={'/profile/notification'}>
					<FontAwesomeIcon
						color='black'
						icon={faBell}
					/>
				</Link>
			),
		},
		{
			title: t('Order'),
			icon: (
				<Link href='/profile/purchased'>
					<FontAwesomeIcon
						icon={faBox}
						color='green'
					/>
				</Link>
			),
		},
		{
			title: 'Đánh giá sản phẩm',
			icon: (
				<Link href='/profile/product-purchased'>
					<FontAwesomeIcon
						icon={faStar}
						color='#F4E71A'
					/>
				</Link>
			),
		},
		{
			title: 'Lịch sử đánh giá',
			icon: (
				<Link href='/profile/reviewed'>
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						color='brown'
					/>
				</Link>
			),
		},
	];
	const ITEMS = [
		{ path: '/profile/change-password', title: t('ChangePassword') },
		{ path: '/profile/notification', title: t('Notification') },
		{ path: '/profile/purchased', title: t('Order') },
		{ path: '/profile/product-purchased', title: 'Đánh giá sản phẩm' },
		{ path: '/profile/reviewed', title: 'Lịch sử đánh giá' },
	];
	const items: MenuItem[] = listItem.map((item) => {
		return getItem(item.title, item.title, item.icon);
	});

	return (
		<div className='w-full h-full'>
			<Menu
				mode={sizeDevice > 576 ? 'vertical' : 'horizontal'}
				items={items}
				defaultSelectedKeys={[ITEMS.find((item) => path.includes(item.path))?.title ?? t('Account')]}
			/>
		</div>
	);
};

export default SideBarProfile;
