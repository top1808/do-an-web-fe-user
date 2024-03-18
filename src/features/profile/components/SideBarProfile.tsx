import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { faBell, faBox, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
const SideBarProfile = () => {
	const [sizeDevice, setSizeDevice] = useState(document.documentElement.clientWidth);
	window.onresize = () => setSizeDevice(window.innerWidth);
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
			{/* <ul className='text-base'>
				{listItem.map((item) => (
					<li
						className='py-2'
						key={item.link}
					>
						<Link
							href={item.link}
							className={`${pathname === item.link && 'font-bold text-blue-500'}`}
						>
							{item.icon}
							&nbsp;&nbsp; {item.title}MenuFoldOutlined
						</Link>
					</li>
				))}
			</ul> */}
			<div>
				<Menu
					mode={sizeDevice > 576 ? 'vertical' : 'horizontal'}
					items={items}
					defaultSelectedKeys={['Thông tin tài khoản']}
				/>
			</div>
		</div>
	);
};

export default SideBarProfile;
