'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTable from '@/components/MTable';
import MTitle from '@/components/MTitle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingMoreNotifications, gettingNotifications } from '@/redux/reducers/notificationReducer';
import { TableProps } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';
interface DataType {
	_id: string;
	body: string;
	createdAt: string;
}
const columns: TableProps<DataType>['columns'] = [
	{
		title: '#ID',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Nội dung',
		dataIndex: 'body',
		key: 'body',
	},
	{
		title: 'Thời gian',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (item: string) => (item ? dayjs(item).format('DD/MM/YYYY') : 'Chưa xác định'),
	},
];
const Notice = () => {
	const { notification } = useAppSelector((state) => state);
	const disptach = useAppDispatch();

	const onViewMore = () => {
		disptach(gettingMoreNotifications({ offset: ((notification.pagination?.limit || 0) + (notification.pagination?.offset || 0)).toString(), limit: '10' }));
	};
	useEffect(() => {
		disptach(gettingNotifications({ limit: '10', offset: '0' }));
	}, [disptach]);
	return (
		<div>
			<MTitle level={3}>Thông báo</MTitle>
			{notification?.data?.map((item) => (
				<Link
					href={item?.link || '/'}
					key={item._id}
				>
					<MRow
						gutter={[4, 4]}
						align='middle'
						className='bg-white p-2 hover:bg-slate-100'
					>
						{/* {item?.image && (
								<Col
									span={4}
									className='flex items-center'
								>
									<Image
										alt='img'
										src={item?.image}
										preview={false}
									/>
								</Col>
							)} */}
						<MCol span={24}>
							<div className='text-sm'>{item?.title}</div>
							<div className='text-xs text-gray-500 text-ellipsis-2'>{item?.body}</div>
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
