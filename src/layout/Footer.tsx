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

const Footer = () => {
	const aboutUs = [
		{
			title: 'Chúng tôi là ai',
			url: '/',
		},
		{
			title: 'Cam kết của chúng tôi',
			url: '/',
		},
		{
			title: 'Tin tuyển dụng',
			url: '/',
		},
		{
			title: 'Hệ thống cửa hàng',
			url: '/',
		},
	];

	const helps = [
		{
			title: 'Hướng dẫn đặt hàng',
			url: '/',
		},
		{
			title: 'Phương thức thanh toán',
			url: '/',
		},
		{
			title: 'Chính sách thành viên',
			url: '/',
		},
		{
			title: 'Chính sách tích - tiêu điểm',
			url: '/',
		},
	];

	const policies = [
		{
			title: 'Chính sách vận chuyển',
			url: '/',
		},
		{
			title: 'Chính sách đổi trả',
			url: '/',
		},
		{
			title: 'Điều kiện & Điều khoản',
			url: '/',
		},
		{
			title: 'Chính sách bảo mật',
			url: '/',
		},
	];
	const contacts = [
		{
			key: 'help-online',
			child: <MText className='text-base font-semibold'>Hỗ trợ tư vấn mua online:</MText>,
		},
		{
			key: 'Hotline-online',
			child: <MText className='text-sm'>Hotline: 0247 308 2882</MText>,
		},
		{
			key: 'Email-online',
			child: <MText className='text-sm'>Email: Vietthang11012002@gmail.com</MText>,
		},
		{
			key: 'time',
			child: <MText className='text-sm'>Giờ làm việc: 8:30 - 22:00 hằng ngày.</MText>,
		},
		{
			key: 'help-off',
			child: <MText className='text-base  font-semibold'>Hỗ trợ khiếu nại và bảo hành sản phẩm:</MText>,
		},
		{
			key: 'Hotline-off',
			child: <MText className='text-sm'>Hotline: 024 7300 6999</MText>,
		},
		{
			key: 'email-off',
			child: <MText className='text-sm'>Email: top1808@gmail.com</MText>,
		},
		{
			key: 'Time-off',
			child: <MText className='text-sm'>Giờ làm việc: 8:30 - 22:00 hằng ngày.</MText>,
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
	return (
		<footer>
			<div className='  bg-white'>
				<div className='max-w-[1200px] mx-auto py-8'>
					<MRow gutter={[4, 16]}>
						<MCol span={4}>
							<MRow gutter={[8, 8]}>
								<MCol
									span={24}
									className='mb-4'
								>
									<MText className='text-xl font-bold'>Về chúng tôi</MText>
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
									<MText className='text-xl font-bold'>Hỗ trợ khách hàng</MText>
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
									<MText className='text-xl font-bold'>Chính sách</MText>
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
									<MText className='text-xl font-bold'>Liên hệ</MText>
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
									<MText className='text-xl font-bold'>Liên kết và thanh toán</MText>
								</MCol>
								<MCol span={24}>
									<MText className='text-base  font-semibold'>Chúng tôi kết nối thanh toán qua</MText>
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
									<MText className='text-base  font-semibold'>Chúng tôi liên kết với dịch vụ giao hàng</MText>
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
							<MText className='text-base font-semibold'>Theo dõi chúng tôi trên</MText>
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
			</div>
		</footer>
	);
};
export default Footer;
