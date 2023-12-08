'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppSelector } from '@/redux/hooks';
import { formatPhonenumber } from '@/utils/FuntionHelpers';
import React from 'react';
const InforUser = () => {
	const { auth } = useAppSelector((state) => state);
	const { currentUserInfo } = auth;

	return (
		<>
			<h3>Thông tin tài khoản</h3>
			<MRow
				justify={'start'}
				align={'middle'}
				className=' font-bold pl-2 py-2  '
			>
				<MCol span={8}>ID:</MCol>
				<MCol
					span={8}
					className='text-blue-600'
				>
					{currentUserInfo?.id}
				</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2	'
			>
				<MCol span={8}>Email:</MCol>
				<MCol
					span={8}
					className='text-blue-600'
				>
					{currentUserInfo?.email}
				</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2'
			>
				<MCol span={8}>Name:</MCol>
				<MCol
					span={8}
					className='text-blue-600'
				>
					{currentUserInfo?.name}
				</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2'
			>
				<MCol span={8}>Phone:</MCol>
				<MCol
					span={8}
					className='text-blue-600'
				>
					{currentUserInfo?.phoneNumber ? formatPhonenumber(currentUserInfo?.phoneNumber) : 'Bạn chưa thêm số điện thoại'}
				</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2 '
			>
				<MCol span={8}>Address:</MCol>
				<MCol
					span={8}
					className='text-blue-600'
				>
					{currentUserInfo?.address ? currentUserInfo?.address : 'Bạn chưa thêm địa chỉ'}
				</MCol>
			</MRow>
		</>
	);
};

export default InforUser;
