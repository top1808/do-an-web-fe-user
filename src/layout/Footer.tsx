'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { faHatCowboy, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	const quickLink = [
		{
			title: 'About',
			url: '/',
		},
		{
			title: 'Blogs',
			url: '/',
		},
		{
			title: 'Contact',
			url: '/',
		},
		{
			title: 'FAQ',
			url: '/',
		},
	];
	const news = [
		{
			title: 'My Account',
			url: '/',
		},
		{
			title: 'Orders',
			url: '/',
		},
		{
			title: 'Orders Tracking',
			url: '/',
		},
		{
			title: 'Checkout',
			url: '/',
		},
		{
			title: 'Wishlist',
			url: '/',
		},
	];
	const contacts = [
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
	return (
		<footer className='xs:px-1 md:px-8 xl:px-32 py-4 mt-4 bg-[#FA5130] text-base font-semibold text-white'>
			<MRow
				justify={'space-between'}
				gutter={[0, 8]}
			>
				<MCol span={7}>
					<MRow gutter={[16, 16]}>
						<MCol span={12}>
							<Link
								href={'/'}
								className='text-xl md:text-4xl font-semibold flex items-center text-gradien text-white hover:text-gray-200  justify-center h-full'
							>
								<FontAwesomeIcon icon={faHatCowboy} />
								<span className='hidden md:block'>T&T Shop</span>
							</Link>
						</MCol>
						<MCol span={12}>
							<MText className='xs:text-md md:text-base xl:text-xl font-semibold text-white'>PAYMENT</MText>
							<MRow>
								<MCol span={8}></MCol>
								<MCol span={8}></MCol>
								<MCol span={8}></MCol>
							</MRow>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={3}>
					<MRow>
						<MCol span={24}>
							<MText className='xs:text-md md:text-base xl:text-xl font-semibold text-white'>QUICK LINKS</MText>
						</MCol>
						{quickLink.map((link) => {
							return (
								<MCol
									key={link.title}
									span={24}
								>
									<Link
										className='xs:text-md md:text-base xl:text-xl text-white font-extralight'
										href={link.url}
									>
										{link.title}
									</Link>
								</MCol>
							);
						})}
					</MRow>
				</MCol>
				<MCol span={3}>
					<MRow>
						<MCol span={24}>
							<MText className='xs:text-md md:text-md xl:text-xl font-semibold text-white '>NEWS</MText>
						</MCol>
						{news.map((item) => {
							return (
								<MCol
									key={item.title}
									span={24}
								>
									<Link
										className='xs:text-md md:text-base xl:text-xl text-white font-extralight'
										href={item.url}
									>
										{item.title}
									</Link>
								</MCol>
							);
						})}
					</MRow>
				</MCol>
				<MCol span={7}>
					<MRow gutter={[0, 16]}>
						<MCol span={24}>
							<MText className='xs:text-md md:text-md xl:text-xl font-semibold text-white'>CONTACT</MText>
						</MCol>
						<MCol span={24}>
							<MRow
								justify={'center'}
								gutter={[0, 16]}
							>
								{contacts.map((contact, index) => {
									return (
										<MCol
											key={index + contact.url}
											xs={12}
											md={8}
											xl={4}
										>
											<Link
												href={'/'}
												className={`xs:text-xl md:text-2xl xl:text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full xl:h-12 xs:h-10 xl:w-12 xs:w-10 ${contact.bgColor}`}
											>
												{contact.icon}
											</Link>
										</MCol>
									);
								})}
							</MRow>
						</MCol>
					</MRow>
				</MCol>
			</MRow>
			<div className='h-[1px] bg-slate-100'></div>
			<MRow className='p-2 mt-2'>
				<MCol
					span={24}
					className='text-center'
				>
					<MText className='text-base text-white'>
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
		</footer>
	);
};

export default Footer;
