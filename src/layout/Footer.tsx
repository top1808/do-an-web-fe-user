'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { faHatCowboy, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/images/logo.png';
import MTitle from '@/components/MTitle';
import { Form } from 'antd';
import MInput from '@/components/MInput';
import MButton from '@/components/MButton';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
	return (
		<footer className='px-32 py-8 bg-gradient-to-r from-lime-500 to-green-500 text-base font-semibold'>
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
							<MTitle level={4}>QUICK LINKS</MTitle>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-black'
								href={'/'}
							>
								About
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-black'
								href={'/'}
							>
								Blogs
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-black'
							>
								Contact
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-black'
							>
								FAQ
							</Link>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={3}>
					<MRow>
						<MCol span={24}>
							<MTitle level={4}>CONTACT</MTitle>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-black'
								href={'/'}
							>
								My Account
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								className='text-lg text-black'
								href={'/'}
							>
								Orders Tracking
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-black'
							>
								Checkout
							</Link>
						</MCol>
						<MCol span={24}>
							<Link
								href={'/'}
								className='text-lg text-black'
							>
								Wishlist
							</Link>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={7}>
					<MRow gutter={[0, 16]}>
						<MCol span={24}>
							<MTitle level={4}>NEWSLETTER</MTitle>
						</MCol>
						{/* <MCol span={24}>
							<Form
								name='form-contact'
								autoComplete='off'
							>
								<Form.Item
									name='email'
									labelCol={{ span: 24 }}
									className='relative'
								>
									<MInput
										className='px-4 py-2'
										placeholder='Email'
									/>
									<MButton className='absolute top-0 right-0 w-1/3 h-full bg-red-400 text-white rounded-xl font-bold'>SUBSCRIBE</MButton>
								</Form.Item>
							</Form>
						</MCol> */}
						<MCol span={24}>
							<MRow
								justify={'space-between'}
								gutter={[0, 16]}
							>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full w-full h-16 bg-blue-500 '
									>
										<FontAwesomeIcon
											color='white'
											icon={faFacebook}
											className='w-full text-center'
										/>
									</Link>
								</MCol>
								<MCol span={4}>
									<Link
										href={'/'}
										className='text-4xl font-bold flex items-center text-gradien  rounded-full w-full h-16 bg-blue-500 '
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
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full w-full h-16 bg-white'
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
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full w-full h-16 bg-white'
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
										className='text-4xl font-bold flex items-center text-gradien text-blue-700 hover:text-blue-500 rounded-full w-full h-16 bg-white'
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
				className='p-4 mt-2'
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
							className='mx-2'
						/>
						by Le Top
					</MText>
				</MCol>
			</MRow>
		</footer>
	);
};

export default Footer;
