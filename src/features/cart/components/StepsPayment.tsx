'use client';
import MButton from '@/components/MButton';
import { faCartShopping, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Steps, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PaymentPage from './PaymentPage';
import { useTranslations } from 'next-intl';

interface ChildrenProps {
	children: React.ReactNode;
	isFail?: boolean;
}
const CustomSteps: React.FC<ChildrenProps> = ({ children, isFail }) => {
	const [current, setCurrent] = useState(isFail ? 1 : 0);
	const router = useRouter();
	const t = useTranslations('CartPage');
	const items = [
		{
			title: t('MyCart'),
			icon: (
				<FontAwesomeIcon
					icon={faCartShopping}
					className='text-lime-600'
				/>
			),
		},
		{
			title: t('Payment'),
			icon: (
				<FontAwesomeIcon
					color='red'
					icon={faDollarSign}
					className='text-lime-600'
				/>
			),
		},
		{
			title: t('TitleProcessCompleted'),
			icon: (
				<FontAwesomeIcon
					color='red'
					icon={faCheck}
					className='text-lime-600'
				/>
			),
		},
	];
	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<div className='hidden lg:block'>
				<Steps
					current={current}
					items={items}
					className='mb-2 '
				>
					{items.map((item) => (
						<Steps.Step
							key={item.title}
							title={item.title}
							className='bg-lime-600 '
						/>
					))}
				</Steps>
			</div>
			{current === 0 ? <div>{children}</div> : <></>}
			{current === 1 ? <PaymentPage /> : <></>}
			<div className='mt-6 flex justify-end'>
				{current === 0 && (
					<MButton
						className='mr-2 bg-green-500 hover:bg-green-300 text-white'
						onClick={() => {
							router.push('/');
						}}
					>
						{t('ButtonContinueShopping')}
					</MButton>
				)}
				{current > 0 && (
					<MButton
						style={{ margin: '0 8px' }}
						onClick={() => prev()}
					>
						{t('ButtonPreviousProcess')}
					</MButton>
				)}
				{current < items.length - 2 && (
					<MButton
						type='primary'
						onClick={() => next()}
					>
						{t('ButtonNextProcess')}
					</MButton>
				)}
				{current === items.length - 1 && (
					<MButton
						type='primary'
						onClick={() => message.success('Processing complete!')}
					>
						{t('Done')}
					</MButton>
				)}
			</div>
		</>
	);
};

export default CustomSteps;
