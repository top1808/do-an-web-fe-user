'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { MSearchInput } from '@/components/MSearchInput';
import { faArrowRightFromBracket, faBell, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/images/logo.png';
import { signOut, useSession } from 'next-auth/react';
import { Dropdown, MenuProps } from 'antd';
import styles from '../styles/layout.module.css';
import { useRouter } from 'next/navigation';
import MBadge from '@/components/MBadge';

const Header = () => {
	const { data: session } = useSession();
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
					Profile
				</div>
			),
			key: '0',
		},
		{
			label: (
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon
						icon={faBell}
						color='#2BC255'
					/>
					Nofication
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
		<header className='py-2 px-32'>
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
					<ul className='flex gap-12 h-full text-lg items-center w-full justify-end'>
						<li>
							<Link
								href={session?.user ? '/cart' : '/login'}
								className=' p-4 rounded-xl hover:bg-blue-200'
							>
								<MBadge
									count={0}
									showZero
									overflowCount={10}
									size='small'
								>
									<FontAwesomeIcon
										icon={faCartShopping}
										color='blue'
										size='xl'
									/>
								</MBadge>
							</Link>
						</li>
						<li>
							{!session ? (
								<div>
									<Link
										href={'/login'}
										className='text-blue-400 rounded-xl p-4 hover:bg-blue-100'
									>
										<FontAwesomeIcon
											icon={faUser}
											color='blue'
											size='xl'
										/>
										&nbsp;Sign in
									</Link>
								</div>
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
