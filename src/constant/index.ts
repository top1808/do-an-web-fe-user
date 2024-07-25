const PAYMENT_METHOD = [
	{
		label: 'Cash',
		value: 'cash',
	},
	{
		label: 'VNPay',
		value: 'vnpay',
	},
];

const ORDER_STATUS = [
	{
		label: 'Processing',
		value: 'processing',
		color: 'yellow',
	},
	{
		label: 'Confirmed',
		value: 'confirmed',
		color: 'green',
	},
	{
		label: 'Delivering',
		value: 'delivering',
		color: 'geekblue',
	},
	{
		label: 'Delivered',
		value: 'delivered',
		color: 'orange',
	},
	{
		label: 'Received',
		value: 'received',
		color: 'pink',
	},
	{
		label: 'Canceled',
		value: 'canceled',
		color: 'red',
	},
];

const firebaseConfig = {
	apiKey: 'AIzaSyBMHktsUuG1kGrmjHcIoKH7ljSh3eegK4g',
	authDomain: 'do-an-web-next.firebaseapp.com',
	projectId: 'do-an-web-next',
	storageBucket: 'do-an-web-next.appspot.com',
	messagingSenderId: '481186732884',
	appId: '1:481186732884:web:b5d5be2b2d671cbf7046c1',
	measurementId: 'G-DXTVY1SG2B',
};
export { firebaseConfig, ORDER_STATUS, PAYMENT_METHOD };
