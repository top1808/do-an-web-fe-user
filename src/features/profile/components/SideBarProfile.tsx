'use client';
import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { faBell, faBox, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const ITEMS = [
	{ path: '/profile', title: 'Thông tin tài khoản' },
	{ path: '/profile/change-password', title: 'Đổi mật khẩu' },
	{ path: '/profile/notification', title: 'Thông báo' },
	{ path: '/profile/purchased', title: 'Đơn hàng' },
];
const SideBarProfile = () => {
	const [sizeDevice, setSizeDevice] = useState(document.documentElement.clientWidth);
	window.onresize = () => setSizeDevice(window.innerWidth);
	const path = usePathname();
	const listItem = [
		{
			title: 'Thông tin tài khoản',
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
			title: 'Đổi mật khẩu',
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
			title: 'Thông báo',
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
			title: 'Đơn hàng',
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
	const items: MenuItem[] = listItem.map((item) => {
		return getItem(item.title, item.title, item.icon);
	});
	return (
		<div className='w-full h-full'>
			<div>
				<Menu
					mode={sizeDevice > 576 ? 'vertical' : 'horizontal'}
					items={items}
					defaultSelectedKeys={[ITEMS.find((item) => item.path === path)?.title || 'Thay đổi mật khẩu']}
				/>
			</div>
		</div>
	);
};

export default SideBarProfile;
