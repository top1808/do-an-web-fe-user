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
import { getAuthState, gettingInfoCurrentUser, loginSuccess, logout } from '@/redux/reducers/authReducer';
import { getCartState, gettingCart } from '@/redux/reducers/cartReducer';
import { getNotificationState, gettingNotifications, readingNotifications } from '@/redux/reducers/notificationReducer';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const Header = () => {
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const cart = useAppSelector(getCartState);
	const auth = useAppSelector(getAuthState);
	const notification = useAppSelector(getNotificationState);
	const pathname = usePathname();
	const t = useTranslations('Headers');
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
					{t('Profile')}
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
					{t('Order')}
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
						{t('Notification')}
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
					{t('SignOut')}
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
		if (cart.statusUpdate !== 'loading') {
			dispatch(gettingCart());
		}
	}, [dispatch, cart.statusUpdate]);
	useEffect(() => {
		if (notification?.data) {
			setNotificationItems(
				notification?.data?.length <= 0
					? [
							{
								label: t('NoNotification'),
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
	}, [dispatch, notification?.data, t]);

	useEffect(() => {
		if (pathname !== '/notification') {
			dispatch(gettingNotifications({ offset: '0', limit: '10' }));
		}
	}, [dispatch, pathname]);

	return (
		<header className='py-8 bg-[#FA5130] relative'>
			<MRow
				justify={'space-between'}
				className='max-w-[1200px] w-full mx-auto xs:px-[2px]'
			>
				<MCol
					xs={2}
					md={4}
				>
					<Link
						href={'/'}
						className='text-2xl md:text-4xl font-bold flex items-center text-gradien text-white hover:text-gray-200  justify-center h-full'
					>
						<FontAwesomeIcon icon={faHatCowboy} />
						<span className='hidden md:block'>T&T</span>
					</Link>
				</MCol>
				<MCol
					xs={15}
					md={12}
				>
					<MSearchInput placeHolder={t('SearchBar')} />
				</MCol>
				<MCol
					xs={6}
					md={8}
				>
					<ul className='flex justify-center gap-4 h-full text-lg items-center w-full md:gap-8'>
						<li>
							<Link
								// href={session?.user ? '/cart' : '/login'}
								href={'/cart'}
								className='rounded-xl'
							>
								<MBadge
									// count={!session?.user ? JSON.parse(localStorage.getItem('userCart') || '[]')?.length : cart?.items?.length}
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
													<div className='text-xs text-center text-blue-600'>{t('ViewAll')}</div>
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
						<li className='overflow-x-hidden'>
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
										<span className='hidden lg:inline-block ml-2'>{t('ButtonLogin')}</span>
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
			<div className='absolute top-1 right-2'>
				<LocaleSwitcher />
			</div>
		</header>
	);
};

export default Header;
