import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/headerUser.module.css';
import { usePathname } from 'next/navigation';
const menuItems = [
	{
		name: 'Home',
		route: '/',
	},
	{
		name: 'Products',
		route: '/products',
	},
	{
		name: 'About',
		route: '/about',
	},
	{
		name: 'Contact',
		route: '/contact',
	},
];
const Menu = () => {
	const path = usePathname();
	const pathName = path;
	return (
		<MRow className='max-sm:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex px-32  bg-yellow-50'>
			{menuItems.map((item, index) => {
				return (
					<MCol
						key={index}
						className={`py-4 ${styles.item} ${pathName === item.route ? 'bg-yellow-600' : ''}`}
					>
						<Link href={item.route}>{item.name}</Link>
					</MCol>
				);
			})}
		</MRow>
	);
};

export default Menu;
