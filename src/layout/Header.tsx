'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { MSearchInput } from '@/components/MSearchInput';
import { faArrowRightFromBracket, faCartShopping, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/images/logo.png';
import { signOut, useSession } from 'next-auth/react';
import { Dropdown, MenuProps } from 'antd';
import styles from '../styles/layout.module.css';

const Header = () => {
	const { data: session } = useSession();
	console.log('🚀 ~ file: Header.tsx:17 ~ Header ~ session:', session);

	const profileItems: MenuProps['items'] = [
		{
			label: (
				<div className='flex items-center gap-2 w-32'>
					<FontAwesomeIcon
						icon={faUser}
						color='#1EAAE8'
					/>
					Profile
				</div>
			),
			key: '0',
		},
		{
			label: (
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon
						icon={faEnvelope}
						color='#2BC255'
					/>
					Inbox
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
					onClick={() => {
						signOut();
					}}
				>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
						color='#FF2F2E'
					/>
					Log out
				</div>
			),
			key: '3',
		},
	];

	return (
		<header
			style={{ backgroundColor: '#FA5130' }}
			className='py-2 px-32'
		>
			<MRow
				justify={'space-between'}
				className=' py-2 px-8'
			>
				<MCol
					xs={4}
					xl={8}
					className='max-sm:w-36 sm:w-36 md:w-36 lg:w-40 xl:w-60 2xl:w-80'
				>
					<Link href={'/'}>
						<MImage
							preview={false}
							src={logo.src}
						/>
					</Link>
				</MCol>
				<MCol
					xs={8}
					xl={8}
					className='max-sm:mt-2 sm:mt-2  2xl:0'
				>
					<div className='h-full flex items-center w-full justify-center'>
						<MSearchInput onSearch={() => {}} />
					</div>
				</MCol>
				<MCol
					xs={12}
					xl={8}
					className='max-sm:mt-2 2xl:0'
				>
					<ul className='flex gap-6 h-full text-lg items-center w-full justify-end text-white	'>
						<li>
							<Link href={'/cart'}>
								<FontAwesomeIcon
									icon={faCartShopping}
									color='white'
								/>
								Cart
							</Link>
						</li>
						<li>
							{!session ? (
								<Link href={'/login'}>
									<FontAwesomeIcon
										icon={faUser}
										color='white'
									/>
									Sign in
								</Link>
							) : (
								<Dropdown
									menu={{ items: profileItems }}
									trigger={['click']}
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
