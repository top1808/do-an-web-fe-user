'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { MSearchInput } from '@/components/MSearchInput';
import { faArrowRightFromBracket, faBell, faBox, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect } from 'react';
import logo from '../../public/images/logo.png';
import { signOut, useSession } from 'next-auth/react';
import { Dropdown, MenuProps } from 'antd';
import styles from '../styles/layout.module.css';
import { useRouter } from 'next/navigation';
import MBadge from '@/components/MBadge';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingInfoCurrentUser, loginSuccess, logout } from '@/redux/reducers/authReducer';
import { gettingCart } from '@/redux/reducers/cartReducer';
const Header = () => {
	const { data: session } = useSession();
	const dispatch = useAppDispatch();

	const { cart } = useAppSelector((state) => state);

	const router = useRouter();
	const profileItems: MenuProps['items'] = [
		{
			label: (
				<div
					className='flex items-center gap-2 w-32'
					onClick={() => router.push('/profile')}
				>
					<FontAwesomeIcon
						icon={faUser}
						color='#1EAAE8'
					/>
					Hồ sơ
				</div>
			),
			key: '0',
		},
		{
			label: (
				<div
					className='flex items-center gap-2'
					onClick={() => router.push('/profile/purchased')}
				>
					<FontAwesomeIcon
						icon={faBox}
						color='#2BC255'
					/>
					Đơn hàng
				</div>
			),
			key: '1',
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
			text: 'Do you want to logout  ?',
			icon: 'question',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel',
			showCancelButton: true,
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

	return (
		<header className='py-2 px-32 bg-gradient-to-r from-lime-500 to-green-500'>
			<MRow
				justify={'space-between'}
				className='py-2 px-6'
			>
				<MCol
					xs={4}
					xl={8}
					className='max-sm:w-36 sm:w-36 md:w-36 lg:w-40 xl:w-60 2xl:w-80'
				>
					<Link
						href={'/'}
						className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500'
					>
						<MImage
							width={50}
							height={50}
							preview={false}
							src={logo.src}
						/>
						T&T
					</Link>
				</MCol>
				{/* <MCol
					xs={8}
					xl={8}
					className='max-sm:mt-2 sm:mt-2  2xl:0'
				>
					<div className='h-full flex items-center w-full justify-center'>
						<MSearchInput onSearch={() => {}} />
					</div>
				</MCol> */}
				<MCol
					xs={12}
					xl={8}
					className='max-sm:mt-2 2xl:0'
				>
					<ul className='flex gap-12 h-full text-lg items-center w-full justify-end'>
						<li>
							<Link
								href={session?.user ? '/cart' : '/login'}
								className='p-4 rounded-xl'
							>
								<MBadge
									count={cart?.items?.length}
									showZero
									overflowCount={10}
									size='small'
								>
									<FontAwesomeIcon
										icon={faCartShopping}
										size='xl'
										className='hover:text-blue-500 text-blue-600'
									/>
								</MBadge>
							</Link>
						</li>
						<li>
							{!session ? (
								<div>
									<Link
										href={'/login'}
										className='text-blue-700 p-4 hover:text-blue-500 font-bold'
									>
										<FontAwesomeIcon
											icon={faUser}
											size='xl'
										/>
										&nbsp;Đăng nhập
									</Link>
								</div>
							) : (
								<Dropdown
									menu={{ items: profileItems }}
									trigger={['click']}
									className='hover:text-blue-500'
								>
									<a
										href='#'
										onClick={(e) => e.preventDefault()}
										className={styles.userProfileContainer}
									>
										<MImage
											src={session?.user?.image || ''}
											className={styles.userAvatar}
											style={{ width: 30, height: 30 }}
											alt='avt'
											preview={false}
										/>
										<strong className='mx-2'>{session?.user?.name}</strong>
									</a>
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
