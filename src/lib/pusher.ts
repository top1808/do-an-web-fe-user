import { NotificationModel } from '@/models/notificationModel';
import Pusher from 'pusher-js';
import { notification } from 'antd';
import { store } from '@/redux/store';
import { gettingNotifications } from '@/redux/reducers/notificationReducer';

const pusher = new Pusher(process.env.PUSHER_KEY || '', {
	cluster: 'ap1',
});

export const onGetPusherNotification = () => {
	const { currentUser } = store.getState().auth;
	const channel = pusher.subscribe('notifications');
	channel.bind('sales_notify', (event: { data: NotificationModel; notification: NotificationModel }) => {
		store.dispatch(gettingNotifications({ offset: '0', limit: '10' }));
		if (currentUser?._id !== event.data?.fromUser && currentUser) {
			const notify: NotificationModel = event.notification;
			const data: NotificationModel = event.data;
			notification.open({
				message: notify?.title,
				description: notify?.body,
				duration: 5,
				onClick: () => window.location.assign(data?.link || ''),
			});
		}
	});
};
