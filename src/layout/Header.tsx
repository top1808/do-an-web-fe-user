'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { MSearchInput } from '@/components/MSearchInput';
import { faArrowRightFromBracket, faBell, faBox, faCartShopping, faHatCowboy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Badge, Dropdown, MenuProps } from 'antd';
import styles from '../styles/layout.module.css';
import { usePathname, useRouter } from 'next/navigation';
import MBadge from '@/components/MBadge';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingInfoCurrentUser, loginSuccess, logout } from '@/redux/reducers/authReducer';
import { gettingCart } from '@/redux/reducers/cartReducer';
import { gettingNotifications, readingNotifications } from '@/redux/reducers/notificationReducer';

const Header = () => {
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const { cart, auth, notification } = useAppSelector((state) => state);
	const pathname = usePathname();

	const [notificationItems, setNotificationItems] = useState<MenuProps['items']>([]);
	const router = useRouter();
	const profileItems: MenuProps['items'] = [
		{
			label: (
				<Link
					href='/profile'
					className='flex items-center gap-2 w-32'
					onClick={() => router.push('/profile')}
				>
					<FontAwesomeIcon
						icon={faUser}
						color='#1EAAE8'
					/>
					Hồ sơ
				</Link>
			),
			key: '0',
		},
		{
			label: (
				<Link
					href='/profile/purchased'
					className='flex items-center gap-2'
					onClick={() => router.push('/profile/purchased')}
				>
					<FontAwesomeIcon
						icon={faBox}
						color='#2BC255'
					/>
					Đơn hàng
				</Link>
			),
			key: '1',
		},
		{
			label: (
				<div className=' xl:hidden'>
					<Link
						href='/profile/notification'
						className='flex items-center gap-2  '
						onClick={() => router.push('/profile/notification')}
					>
						<FontAwesomeIcon
							icon={faBell}
							color='black'
						/>
						Thông báo
					</Link>
				</div>
			),
			key: '2',
		},
		{
			type: 'divider',
		},
		{
			label: (
				<div
					className='flex items-center gap-2'
					onClick={() => handleLogout()}
				>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
						color='#FF2F2E'
					/>
					Đăng xuất
				</div>
			),
			key: '3',
		},
	];

	const handleLogout = () => {
		Swal.fire({
			text: 'Do you want to logout?',
			icon: 'question',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel',
			showCancelButton: true,
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				signOut();
				dispatch(logout());
			}
		});
	};

	useEffect(() => {
		if (session && session.user) {
			dispatch(gettingInfoCurrentUser(session.user?.id));
			dispatch(loginSuccess(session.user));
		}
	}, [dispatch, session]);

	useEffect(() => {
		dispatch(gettingCart());
	}, [dispatch, cart.statusUpdate]);
	useEffect(() => {
		if (notification?.data) {
			setNotificationItems(
				notification?.data?.length <= 0
					? [
							{
								label: 'No notifications.',
								key: 'no_notificaitons.',
							},
					  ]
					: notification?.data?.map((item) => ({
							label: (
								<Link
									href={item?.link || '/'}
									onClick={() => dispatch(readingNotifications(item?._id || ''))}
								>
									<MRow
										gutter={[4, 4]}
										className='w-92'
										align='middle'
									>
										<MCol span={2}>
											<Badge dot={!item.isRead} />
										</MCol>
										<MCol
											span={22}
											className={`${item.isRead ? 'text-slate-400' : 'text-black'}`}
										>
											<div className='text-sm font-semibold'>{item?.title}</div>
											<div className='text-xs text-ellipsis-2'>{item?.body}</div>
										</MCol>
									</MRow>
								</Link>
							),
							key: item?._id || '',
					  })),
			);
		}
	}, [notification?.data]);

	useEffect(() => {
		if (pathname !== '/notification') {
			dispatch(gettingNotifications({ offset: '0', limit: '10' }));
		}
	}, [dispatch, pathname]);

	return (
		<header className='py-2 md:px-8  xl:px-32 bg-gradient-to-r from-orange-500 to-yellow-500'>
			<MRow
				justify={'space-between'}
				className='w-screen px-2 xl:px-4'
			>
				<MCol
					xs={2}
					md={4}
				>
					<Link
						href={'/'}
						className='text-xl md:text-4xl font-bold flex items-center text-gradien text-white hover:text-gray-200  justify-center h-full'
					>
						<FontAwesomeIcon icon={faHatCowboy} />
						<span className='hidden md:block'>T&T</span>
					</Link>
				</MCol>
				<MCol
					xs={14}
					md={12}
				>
					<MSearchInput />
				</MCol>
				<MCol
					xs={8}
					md={8}
				>
					<ul className='flex justify-center gap-4 h-full text-lg items-center w-full md:gap-8'>
						<li>
							<Link
								href={session?.user ? '/cart' : '/login'}
								className='rounded-xl'
							>
								<MBadge
									count={cart?.items?.length}
									showZero
									overflowCount={10}
									size='small'
								>
									<FontAwesomeIcon
										icon={faCartShopping}
										className='text-white hover:text-gray-200 xs:text-lg xl:text-xl'
									/>
								</MBadge>
							</Link>
						</li>
						<li className='hidden xl:block'>
							<Dropdown
								menu={{
									items: [
										...(notificationItems || []),
										{
											label: (
												<Link href='/profile/notification'>
													<div className='text-xs text-center text-blue-600'>View all</div>
												</Link>
											),
											key: 'view_all',
										},
									],
								}}
								trigger={['click']}
								placement='bottomRight'
								disabled={pathname.includes('/notification')}
							>
								<MBadge count={notification.pagination?.totalNew}>
									<div className='cursor-pointer'>
										<FontAwesomeIcon
											icon={faBell}
											className='text-white hover:text-gray-200 xs:text-lg xl:text-xl'
										/>
									</div>
								</MBadge>
							</Dropdown>
						</li>
						<li>
							{!session ? (
								<div>
									<Link
										href={'/login'}
										className=' text-white hover:text-gray-200 font-bold'
									>
										<FontAwesomeIcon
											icon={faUser}
											className='text-lg xl:text-xl'
										/>
										<span className='hidden lg:inline-block'>Đăng nhập</span>
									</Link>
								</div>
							) : (
								<Dropdown
									menu={{ items: profileItems }}
									trigger={['click']}
									className='text-white hover:text-gray-200 text-lg md:text-xl'
								>
									<div className={styles.userProfileContainer}>
										<MImage
											src={auth?.currentUserInfo?.image || ''}
											className={styles.userAvatar}
											style={{ width: 30, height: 30 }}
											alt='avt'
											preview={false}
										/>
										<strong className='mx-1 hidden xl:inline-block text-ellipsis'>{auth?.currentUserInfo?.name}</strong>
									</div>
								</Dropdown>
							)}
						</li>
					</ul>
				</MCol>
			</MRow>
		</header>
	);
};

export default Header;
