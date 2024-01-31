import { firebaseConfig } from '@/constant';
import { setToken } from '@/redux/reducers/notificationReducer';
import { store } from '@/redux/store';
import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
const app = initializeApp(firebaseConfig);
let messaging: Messaging;
if (typeof window !== 'undefined') {
	isSupported().then((value) => {
		if (value) {
			messaging = getMessaging(app);
		}
	});
}
export const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.addEventListener('message', (event) => {
			// console.log('🚀 ~ navigator.serviceWorker.addEventListener ~ event:', event);
		});
	}
};

export const requestPermission = async () => {
	try {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				return getToken(messaging, {
					vapidKey: 'BPt47f6RDk2JPyvk8mRldi8-Mz_IaGOP9YdSRE8cHFejc4hHLnfhE4ZPbpt4bGMv8pZa5ZHWVv-4TWXLZVLeKlg',
				})
					.then((token) => {
						store.dispatch(setToken(token));
					})
					.catch((err) => {
						// console.log('error: ' + err);
					});
			}
		});
	} catch (error) {
		// console.log('An error occurred while retrieving token. ', error);
	}
};
export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
