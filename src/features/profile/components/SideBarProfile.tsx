'use client';
import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { faBell, faBox, faClockRotateLeft, faKey, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useWindowSize from '@/hooks/useWindowSize';

const SideBarProfile = () => {
	const sizeDevice = useWindowSize();
	const t = useTranslations('ProfilePage');
	const path = usePathname();
	const listItem = [
		{
			title: t('Account'),
			icon: (
				<Link href={'/profile'}>
					<FontAwesomeIcon
						color='blue'
						icon={faUser}
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
		{
			title: t('ChangePassword'),
			icon: (
				<Link href={'/profile/change-password'}>
					<FontAwesomeIcon
						color='#EBB636'
						icon={faKey}
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
		{
			title: t('Notification'),
			icon: (
				<Link href={'/profile/notification'}>
					<FontAwesomeIcon
						color='black'
						icon={faBell}
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
		{
			title: t('Order'),
			icon: (
				<Link href='/profile/purchased'>
					<FontAwesomeIcon
						icon={faBox}
						color='green'
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
		{
			title: t('Review.Title'),
			icon: (
				<Link href='/profile/product-purchased'>
					<FontAwesomeIcon
						icon={faStar}
						color='#F4E71A'
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
		{
			title: t('HistoryReview.Title'),
			icon: (
				<Link href='/profile/reviewed'>
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						color='brown'
						size={sizeDevice.width < 576 ? '2xl' : '1x'}
					/>
				</Link>
			),
		},
	];
	const ITEMS = [
		{ path: '/profile/change-password', title: t('ChangePassword') },
		{ path: '/profile/notification', title: t('Notification') },
		{ path: '/profile/purchased', title: t('Order') },
		{ path: '/profile/product-purchased', title: t('Review.Title') },
		{ path: '/profile/reviewed', title: t('HistoryReview.Title') },
	];
	const items: MenuItem[] = listItem.map((item) => {
		return getItem(item.title, item.title, item.icon);
	});
	const itemsMobile: MenuItem[] = listItem.map((item) => {
		return getItem(item.icon, item.title);
	});
	return (
		<div className='w-full h-full'>
			<Menu
				mode={sizeDevice.width > 576 ? 'vertical' : 'horizontal'}
				items={sizeDevice.width > 576 ? items : itemsMobile}
				selectedKeys={[ITEMS.find((item) => path.includes(item.path))?.title ?? t('Account')]}
				style={{ width: '100%' }}
			/>
		</div>
	);
};

export default SideBarProfile;
