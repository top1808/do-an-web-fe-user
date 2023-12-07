'use client';
import MButton from '@/components/MButton';
import { faCartShopping, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Steps, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PaymentPage from './PaymentPage';
import { useAppSelector } from '@/redux/hooks';
const items = [
	{
		title: 'Giỏ hàng của tôi',
		icon: (
			<FontAwesomeIcon
				icon={faCartShopping}
				className='text-lime-600'
			/>
		),
	},
	{
		title: 'Thanh toán',
		icon: (
			<FontAwesomeIcon
				color='red'
				icon={faDollarSign}
				className='text-lime-600'
			/>
		),
	},
	{
		title: 'Hoàn tất thanh toán',
		icon: (
			<FontAwesomeIcon
				color='red'
				icon={faCheck}
				className='text-lime-600'
			/>
		),
	},
];
interface ChildrenProps {
	children: React.ReactNode;
}
const CustomSteps: React.FC<ChildrenProps> = ({ children }) => {
	const [current, setCurrent] = useState(0);
	const router = useRouter();
	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<Steps
				current={current}
				items={items}
				className='mb-2'
			>
				{items.map((item) => (
					<Steps.Step
						key={item.title}
						title={item.title}
						className='bg-lime-600'
					/>
				))}
			</Steps>

			{current === 0 ? <div>{children}</div> : <></>}
			{current === 1 ? <PaymentPage /> : <></>}
			<div className='mt-6 flex justify-end'>
				{current === 0 && (
					<MButton
						className='mr-2 bg-red-400 text-white'
						onClick={() => {
							router.push('/');
						}}
					>
						Tiếp tục mua sắm
					</MButton>
				)}
				{current > 0 && (
					<MButton
						style={{ margin: '0 8px' }}
						onClick={() => prev()}
					>
						Previous
					</MButton>
				)}
				{current < items.length - 2 && (
					<MButton
						type='primary'
						onClick={() => next()}
					>
						Next
					</MButton>
				)}
				{current === items.length - 1 && (
					<MButton
						type='primary'
						onClick={() => message.success('Processing complete!')}
					>
						Done
					</MButton>
				)}
			</div>
		</>
	);
};

export default CustomSteps;
