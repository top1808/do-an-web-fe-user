import { faBell, faBox, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideBarProfile = () => {
	const pathname = usePathname();

	const listItem = [
		{
			title: 'Thông tin tài khoản',
			icon: (
				<FontAwesomeIcon
					color='blue'
					icon={faUser}
				/>
			),
			link: '/profile',
		},
		{
			title: 'Đổi mật khẩu',
			icon: (
				<FontAwesomeIcon
					color='#EBB636'
					icon={faKey}
				/>
			),
			link: '/profile/change-password',
		},
		{
			title: 'Thông báo',
			icon: (
				<FontAwesomeIcon
					color='black'
					icon={faBell}
				/>
			),
			link: '/profile/notification',
		},
		{
			title: 'Đơn hàng',
			icon: (
				<FontAwesomeIcon
					icon={faBox}
					color='green'
				/>
			),
			link: '/profile/purchased',
		},
	];

	return (
		<div className='w-full'>
			<ul className='text-base'>
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
							&nbsp;&nbsp; {item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SideBarProfile;
