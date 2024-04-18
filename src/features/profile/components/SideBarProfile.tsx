'use client';
import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { faBell, faBox, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
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
	];
	const ITEMS = [
		{ path: '/profile', title: 'Thông tin tài khoản' },
		{ path: '/profile/change-password', title: 'Đổi mật khẩu' },
		{ path: '/profile/notification', title: 'Thông báo' },
		{ path: '/profile/purchased', title: 'Đơn hàng' },
	];
	const items: MenuItem[] = listItem.map((item) => {
		return getItem(item.title, item.title, item.icon);
	});
	return (
		<div className='w-full h-full'>
			<div>
				<Menu
					mode={sizeDevice > 576 ? 'vertical' : 'horizontal'}
					items={items}
					defaultSelectedKeys={[ITEMS.find((item) => item.path.includes(path))?.title || 'Thay đổi mật khẩu']}
				/>
			</div>
		</div>
	);
};

export default SideBarProfile;
