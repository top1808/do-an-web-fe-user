'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getNotificationState, gettingMoreNotifications, gettingNotifications, readingNotifications } from '@/redux/reducers/notificationReducer';
import { Badge } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Notice = () => {
	const notification = useAppSelector(getNotificationState);
	const dispatch = useAppDispatch();
	const onViewMore = () => {
		dispatch(gettingMoreNotifications({ offset: ((notification.pagination?.limit || 0) + (notification.pagination?.offset || 0)).toString(), limit: '10' }));
	};
	useEffect(() => {
		dispatch(gettingNotifications({ limit: '10', offset: '0' }));
	}, [dispatch]);

	return (
		<div>
			<MTitle level={3}>Notifications</MTitle>
			{notification.data && notification.data.length < 1 && <div className='text-xl font-semibold'>No notifications</div>}
			{notification?.data?.map((item) => (
				<Link
					href={item?.link || '/'}
					key={item._id}
					onClick={() => dispatch(readingNotifications(item?._id || ''))}
				>
					<MRow
						gutter={[4, 4]}
						align='middle'
						className='bg-white p-2 hover:bg-slate-100'
					>
						<MCol span={2}>
							<Badge dot={!item.isRead} />
						</MCol>
						<MCol
							span={22}
							className={`${item.isRead ? 'text-slate-400' : 'text-black'}`}
						>
							<div className='text-sm font-semibold'>{item?.title}</div>
							<div className='text-xs text-ellipsis-2'>{item?.body}</div>
						</MCol>
					</MRow>
				</Link>
			))}
			{(notification?.pagination?.total || 0) > 10 && notification.data?.length !== notification.pagination?.total && (
				<MRow
					gutter={[4, 4]}
					align='middle'
					className='bg-white p-2 hover:bg-slate-100 text-center cursor-pointer'
					onClick={onViewMore}
				>
					<MCol span={24}>
						<MButton
							type='text'
							className='text-sm text-blue-600'
							loading={notification.isLoadingMore}
						>
							View more
						</MButton>
					</MCol>
				</MRow>
			)}
		</div>
	);
};

export default Notice;
