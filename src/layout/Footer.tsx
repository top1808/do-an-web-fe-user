'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import cod from '../../public/icons/cod.svg';
import vnpay from '../../public/icons/vnpay.svg';
import ghn from '../../public/icons/logo-ghn-new.png';

import Image from 'next/image';
import { MenuItem } from '@/models/productModels';
import { getItem } from '@/utils/FunctionHelpers';
import { Menu } from 'antd';
import { useTranslations } from 'next-intl';

const Footer = () => {
	const t = useTranslations('Footer');
	const aboutUs = [
		{
			title: t('AboutUs'),
			url: '/',
		},
		{
			title: t('Commitment'),
			url: '/',
		},
		{
			title: t('Jobs'),
			url: '/',
		},
		{
			title: t('Stores'),
			url: '/',
		},
	];
	const helps = [
		{
			title: t('OrderingGuide'),
			url: '/',
		},
		{
			title: t('PaymentMethods'),
			url: '/',
		},
		{
			title: t('MembershipPolicy'),
			url: '/',
		},
		{
			title: t('PointsPolicy'),
			url: '/',
		},
	];
	const policies = [
		{
			title: t('ShippingPolicy'),
			url: '/',
		},
		{
			title: t('ReturnPolicy'),
			url: '/',
		},
		{
			title: t('Terms&Conditions'),
			url: '/',
		},
		{
			title: t('PrivacyPolicy'),
			url: '/',
		},
	];
	const contacts = [
		{
			key: 'help-online',
			child: <MText className='text-base font-semibold'>{t('SupportOnline.Help')}</MText>,
		},
		{
			key: 'Hotline-online',
			child: <MText className='text-sm'>{t('SupportOnline.Hotline')}</MText>,
		},
		{
			key: 'Email-online',
			child: <MText className='text-sm'>{t('SupportOnline.Email')}</MText>,
		},
		{
			key: 'time',
			child: <MText className='text-sm'>{t('SupportOnline.WorkingHours')}</MText>,
		},
		{
			key: 'help-off',
			child: <MText className='text-base  font-semibold'>{t('ComplaintSuport.Help')}</MText>,
		},
		{
			key: 'Hotline-off',
			child: <MText className='text-sm'>{t('ComplaintSuport.Hotline')}</MText>,
		},
		{
			key: 'email-off',
			child: <MText className='text-sm'>{t('ComplaintSuport.Email')}</MText>,
		},
		{
			key: 'Time-off',
			child: <MText className='text-sm'>{t('ComplaintSuport.WorkingHours')}</MText>,
		},
	];
	const socials = [
		{
			icon: (
				<FontAwesomeIcon
					className='w-full text-center'
					color='white'
					icon={faFacebook}
				/>
			),
			url: '/',
			bgColor: 'bg-blue-500',
		},
		{
			icon: (
				<FontAwesomeIcon
					className='w-full text-center'
					color='orange'
					icon={faInstagram}
				/>
			),
			url: '/',
			bgColor: 'bg-white',
		},
		{
			icon: (
				<FontAwesomeIcon
					className='w-full text-center'
					color='black'
					icon={faTiktok}
				/>
			),
			url: '/',
			bgColor: 'bg-white',
		},
		{
			icon: (
				<FontAwesomeIcon
					color='white'
					icon={faTwitter}
					className='w-full text-center'
				/>
			),
			url: '/',
			bgColor: 'bg-blue-500',
		},
		{
			icon: (
				<FontAwesomeIcon
					color='red'
					icon={faYoutube}
					className='w-full text-center'
				/>
			),
			url: '/',
			bgColor: 'bg-white',
		},
	];
	const items: MenuItem[] = [
		getItem(
			<MText className='text-sm font-bold'>{t('About')}</MText>,
			'aboutUs',
			<></>,
			aboutUs.map((item) => {
				return getItem(
					<Link
						href={item.url}
						className='text-sm   block'
					>
						{item.title}
					</Link>,
					item.title,
				);
			}),
		),
		getItem(
			<MText className='text-sm font-bold'>{t('CustomerSupport')}</MText>,
			'helps',
			<></>,
			helps.map((item) => {
				return getItem(
					<Link
						href={item.url}
						className='text-sm   block'
					>
						{item.title}
					</Link>,
					item.title,
				);
			}),
		),
		getItem(
			<MText className='text-sm font-bold'>{t('Policy')}</MText>,
			'policies',
			<></>,
			policies.map((item) => {
				return getItem(
					<Link
						href={item.url}
						className='text-sm   block'
					>
						{item.title}
					</Link>,
					item.title,
				);
			}),
		),
		getItem(
			<MText className='text-sm font-bold'>{t('Contact')}</MText>,
			'contact',
			<></>,
			contacts.map((item) => {
				return getItem(item.child, item.key);
			}),
		),
	];

	return (
		<footer>
			<div className='bg-white hidden xl:block'>
				<div className='max-w-[1200px] mx-auto py-8'>
					<MRow gutter={[4, 16]}>
						<MCol span={4}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>{t('About')}</MText>
								</MCol>
								{aboutUs.map((item) => (
									<MCol
										span={24}
										key={item.title}
									>
										<Link
											href={item.url}
											className='text-sm   block'
										>
											{item.title}
										</Link>
									</MCol>
								))}
							</MRow>
						</MCol>
						<MCol span={5}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>{t('CustomerSupport')}</MText>
								</MCol>
								{helps.map((item) => (
									<MCol
										span={24}
										key={item.title}
									>
										<Link
											href={item.url}
											className='text-sm   block'
										>
											{item.title}
										</Link>
									</MCol>
								))}
							</MRow>
						</MCol>
						<MCol span={5}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>{t('Policy')}</MText>
								</MCol>
								{policies.map((item) => (
									<MCol
										span={24}
										key={item.title}
									>
										<Link
											href={item.url}
											className='text-sm   block'
										>
											{item.title}
										</Link>
									</MCol>
								))}
							</MRow>
						</MCol>
						<MCol span={5}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>{t('Contact')}</MText>
								</MCol>
								{contacts.map((item) => (
									<MCol
										span={24}
										key={item.key}
									>
										{item.child}
									</MCol>
								))}
							</MRow>
						</MCol>
						<MCol span={5}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>{t('LinksAndPayments')}</MText>
								</MCol>
								<MCol span={24}>
									<MText className='text-base  font-semibold'>{t('AccecptedPayments')}</MText>
								</MCol>
								<MCol>
									<Image
										src={cod}
										alt='cod'
									/>
								</MCol>
								<MCol>
									<Image
										src={vnpay}
										alt='vnpay-icon'
									/>
								</MCol>
								<MCol span={24}>
									<MText className='text-base  font-semibold'>{t('AccecptedDelivery')}</MText>
								</MCol>
								<MCol>
									<Image
										src={ghn}
										alt='ghn-icon'
									/>
								</MCol>
							</MRow>
						</MCol>
					</MRow>
					<MRow
						gutter={[4, 16]}
						justify={'start'}
					>
						<MCol span={24}>
							<MText className='text-base font-semibold'>{t('Socials')}</MText>
						</MCol>
						<MCol span={24}>
							<MRow
								justify={'start'}
								gutter={[8, 8]}
							>
								{socials.map((item, index) => (
									<MCol key={index}>
										<Link
											href={item.url}
											className={`xs:text-xl md:text-2xl xl:text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full xl:h-12 xs:h-10 xl:w-12 xs:w-10 ${item.bgColor}`}
										>
											{item.icon}
										</Link>
									</MCol>
								))}
							</MRow>
						</MCol>
					</MRow>
				</div>
			</div>
			<MRow className='bg-white block xl:hidden'>
				<MCol span={24}>
					<Menu
						style={{ width: '100%' }}
						mode='inline'
						items={items}
					/>
				</MCol>
				<MCol
					span={24}
					className='px-2'
				>
					<MRow gutter={[8, 8]}>
						<MCol
							span={24}
							className='mb-4'
						>
							<MText className='text-xl font-bold'>{t('LinksAndPayments')}</MText>
						</MCol>
						<MCol span={24}>
							<MText className='text-base  font-semibold'>{t('AccecptedPayments')}</MText>
						</MCol>
						<MCol>
							<Image
								src={cod}
								alt='cod'
							/>
						</MCol>
						<MCol>
							<Image
								src={vnpay}
								alt='vnpay-icon'
							/>
						</MCol>
						<MCol span={24}>
							<MText className='text-base  font-semibold'>{t('AccecptedDelivery')}</MText>
						</MCol>
						<MCol>
							<Image
								src={ghn}
								alt='ghn-icon'
							/>
						</MCol>
					</MRow>
				</MCol>
			</MRow>
			<div className='bg-black'>
				<div className=' py-4'>
					<MRow className='p-2 mt-2'>
						<MCol
							span={24}
							className='text-center'
						>
							<MText className='text-base  text-white'>
								Copyright © 2023 All rights reserved | This template is made with
								<FontAwesomeIcon
									color='red'
									icon={faHeart}
									className='mx-1'
								/>
								by the best designer in the world.
							</MText>
						</MCol>
					</MRow>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
