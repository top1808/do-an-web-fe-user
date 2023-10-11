'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';

const InforUser = () => {
	const { auth } = useAppSelector((state) => state);
	return (
		<>
			<h3>Thông tin tài khoản</h3>
			<MRow
				justify={'start'}
				align={'middle'}
				className=' hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>ID:</MCol>
				<MCol span={8}>{auth.currentUser?._id}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2	'
			>
				<MCol span={8}>User name:</MCol>
				<MCol span={8}>{auth.currentUser?.username}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2'
			>
				<MCol span={8}>Name:</MCol>
				<MCol span={8}>{auth.currentUser?.name}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>Phone:</MCol>
				<MCol span={8}>{auth.currentUser?.phone}</MCol>
			</MRow>
			<MRow
				justify={'start'}
				align={'middle'}
				className='h-8 hover:bg-slate-400 font-bold pl-2 py-2  '
			>
				<MCol span={8}>Email:</MCol>
				<MCol span={8}>{auth.currentUser?.email}</MCol>
			</MRow>
		</>
	);
};

export default InforUser;
