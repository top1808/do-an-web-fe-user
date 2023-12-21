'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<footer className='px-32 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-base font-semibold text-white'>
			<MRow
				justify={'space-between'}
				gutter={[0, 8]}
			>
				<MCol span={7}>
					<MRow>
						<MCol span={24}>
							<MText>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore minima, voluptatem recusandae facere consequatur eligendi repudiandae iste reprehenderit nostrum ipsa! Temporibus
								distinctio culpa, totam ullam repudiandae laboriosam commodi quae impedit.
							</MText>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={3}>
					<MRow>
						<MCol span={24}>
							<MText className='text-xl font-bold'>QUICK LINKS</MText>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-white'
								href={'/'}
							>
								About
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-white'
								href={'/'}
							>
								Blogs
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-white'
							>
								Contact
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-white'
							>
								FAQ
							</Link>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={3}>
					<MRow>
						<MCol span={24}>
							<MText className='text-xl font-bold'>NEWS</MText>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-white'
								href={'/'}
							>
								My Account
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-white'
								href={'/'}
							>
								Orders Tracking
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-white'
							>
								Checkout
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-white'
							>
								Wishlist
							</Link>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={7}>
					<MRow gutter={[0, 16]}>
						<MCol span={24}>
							<MText className='text-xl font-bold'>CONTACT</MText>
						</MCol>
						<MCol span={24}>
							<MRow
								justify={'space-between'}
								gutter={[0, 16]}
							>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full h-12 w-12 bg-blue-500 '
									>
										<FontAwesomeIcon
											color='white'
											icon={faFacebook}
											className='text-center w-full'
										/>
									</Link>
								</MCol>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien  rounded-full h-12 w-12 bg-blue-500 '
									>
										<FontAwesomeIcon
											color='white'
											icon={faTwitter}
											className='w-full text-center'
										/>
									</Link>
								</MCol>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full h-12 w-12 bg-white'
									>
										<FontAwesomeIcon
											color='red'
											icon={faYoutube}
											className='w-full text-center'
										/>
									</Link>
								</MCol>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full h-12 w-12 bg-white'
									>
										<FontAwesomeIcon
											className='w-full text-center'
											color='orange'
											icon={faInstagram}
										/>
									</Link>
								</MCol>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full h-12 w-12 bg-white'
									>
										<FontAwesomeIcon
											className='w-full text-center'
											color='black'
											icon={faTiktok}
										/>
									</Link>
								</MCol>
							</MRow>
						</MCol>
					</MRow>
				</MCol>
			</MRow>
			<MRow
				className='p-2 mt-2'
				style={{ borderTop: '1px solid black' }}
			>
				<MCol
					span={24}
					className='text-center'
				>
					<MText className='text-base'>
						Copyright © 2023 All rights reserved | This template is made with
						<FontAwesomeIcon
							color='red'
							icon={faHeart}
							className='mx-1'
						/>
						by Le Top
					</MText>
				</MCol>
			</MRow>
		</footer>
	);
};

export default Footer;
