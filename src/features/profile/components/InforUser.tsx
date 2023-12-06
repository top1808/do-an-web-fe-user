'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useSession } from 'next-auth/react';
import React from 'react';
const InforUser = () => {
	const session = useSession();
	return (
		<>
			<h3>Thông tin tài khoản</h3>
			<MRow
				justify={'start'}
				align={'middle'}
				className=' font-bold pl-2 py-2  '
			>
				<MCol span={8}>ID:</MCol>
				<MCol span={8}>{session.data?.user.id}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2	'
			>
				<MCol span={8}>User name:</MCol>
				<MCol span={8}>{session.data?.user.email}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2'
			>
				<MCol span={8}>Name:</MCol>
				<MCol span={8}>{session.data?.user.name}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2'
			>
				<MCol span={8}>Phone:</MCol>
				<MCol span={8}>{session.data?.user.phoneNumber ? session.data?.user.phoneNumber : 'Bạn chưa thêm số điện thoại'}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 font-bold pl-2 py-2 '
			>
				<MCol span={8}>Email:</MCol>
				<MCol span={8}>{session.data?.user.email ? session.data?.user.email : 'Bạn chưa thêm email'}</MCol>
			</MRow>
		</>
	);
};

export default InforUser;
