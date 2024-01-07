import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import Link from 'next/link';
import React from 'react';
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
		// 	name: 'Contact',
		// 	route: { pathname: '/contact' },
		// },
	];

	const path = usePathname();

	return (
		<MRow className='max-sm:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex px-32 bg-gradient-to-r from-orange-500 to-yellow-500'>
			{menuItems.map((item, index) => {
				return (
					<MCol
						key={index}
						className={`py-4 font-bold ${styles.item}`}
					>
						<Link
							href={item.route}
							className={`hover:text-blue-600 ${path === item.route?.pathname ? 'text-blue-800 underline' : 'text-white'}`}
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
