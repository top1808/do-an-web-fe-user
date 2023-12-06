import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from '../styles/headerUser.module.css';
import { usePathname } from 'next/navigation';

const Menu = () => {
	const menuItems = [
		{
			name: 'Home',
			route: { pathname: '/' },
		},
		{
			name: 'Product',
			route: { pathname: '/product', query: { category: 'all' } },
		},
		// {
		// 	name: 'About',
		// 	route: '/about',
		// },
		{
			name: 'Contact',
			route: { pathname: 'contact' },
		},
	];

	const path = usePathname();

	return (
		<MRow className='max-sm:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex px-32 bg-gradient-to-r from-lime-500 to-green-500'>
			{menuItems.map((item, index) => {
				return (
					<MCol
						key={index}
						className={`py-4 font-bold ${styles.item} ${path === item.route?.pathname ? 'text-blue-700' : ''}`}
					>
						<Link
							href={item.route}
							className='hover:text-blue-700'
						>
							{item.name}
						</Link>
					</MCol>
				);
			})}
		</MRow>
	);
};

export default Menu;
