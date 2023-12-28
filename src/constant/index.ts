export const PAYMENT_METHOD = [
	{
		label: 'Thanh toán khi nhận hàng',
		value: 'cash',
	},
	{
		label: 'Momo',
		value: 'momo',
	},
];

export const ORDER_STATUS = [
	{
		label: 'Đang xử lý',
		value: 'processing',
		color: 'yellow',
	},
	{
		label: 'Đã xác nhận',
		value: 'confirmed',
		color: 'green',
	},
	{
		label: 'Đang giao hàng',
		value: 'delivering',
		color: 'geekblue',
	},
	{
		label: 'Đã giao hàng',
		value: 'delivered',
		color: 'orange',
	},
	{
		label: 'Đã nhận hàng',
		value: 'received',
		color: 'pink',
	},
	{
		label: 'Đã hủy',
		value: 'canceled',
		color: 'red',
	},
];
